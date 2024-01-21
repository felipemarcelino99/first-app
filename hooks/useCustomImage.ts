'use client'
import { useEffect, useState } from 'react';

export default function useCustomImage() {
    const [height, setHeight] = useState<number>(300);
    const [width, setWidth] = useState<number>(300);
    const [type, setType] = useState<number | string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [backgroundColors, setBackgroundColors] = useState<string[]>([]);
    const [gradientClass, setGradientClass] = useState<string>("from-indigo-500 via-purple-500 to-pink-500");
    
    const BASE_URL = `https://source.unsplash.com/featured/`
    const URL = `${BASE_URL}${width}x${height}?${type}`

    
    useEffect(() => {
        const loadImage = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await fetch(URL);
                if (response.ok) {
                    extractImageColors(URL, 5)
                    .then((colors) => {
                        if (Array.isArray(colors)) {
                            setBackgroundColors(colors);
                            setGradient();
                        } else {
                            console.error('Erro ao extrair cores: As cores não são uma array válida.');
                        }
                    })
                    .catch((erro) => {
                        setError(`Ops...Tivemos um problema com esta imagem, por favor, tente novamente!`);
                    });
                } else {
                    setError(`Ops...Tivemos um problema com esta imagem, por favor, tente novamente!`);
                    return;
                }
            } catch (error) {
                setError(`Ops...Tivemos um problema com esta imagem, por favor, tente novamente!`);
            } finally {
                setIsLoading(false);
            }
        };

        loadImage();
    }, [height, width, type, URL]); 

    async function extractImageColors(imageUrl: string, numberOfColors: number) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const img = new Image();
    
        img.crossOrigin = "Anonymous";
    
        return new Promise((resolve, reject) => {
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
    
                context?.drawImage(img, 0, 0, img.width, img.height);
    
                const imageData = context?.getImageData(0, 0, img.width, img.height).data;
                const cores = [];
    
                if (imageData) {
                    for (let i = 0; i < imageData.length; i += 4) {
                        const cor = `rgb(${imageData[i]}, ${imageData[i + 1]}, ${imageData[i + 2]})`;
                        cores.push(cor);
    
                        if (cores.length === numberOfColors) {
                            break;
                        }
                    }
                }
    
                resolve(cores);
            };
    
            img.onerror = function () {
                reject(new Error('Erro ao carregar a imagem.'));
            };
    
            img.src = imageUrl;
        });
    }

    function setGradient(): void {
        if (backgroundColors.length === 0) {
            setGradientClass(`from-indigo-500 via-purple-500 to-pink-500`);
            return;
        }
    
        const hexColors = backgroundColors.map((color) => rgbToHex(color));
        setGradientClass(`from-[${hexColors[0]}] via-[${hexColors[2]}] to-[${hexColors[4]}]`);
    }
    
    function rgbToHex(rgb: string): string {
        const [r, g, b] = rgb.match(/\d+/g) || [];
        return `#${Number(r).toString(16).padStart(2, '0')}${Number(g).toString(16).padStart(2, '0')}${Number(b).toString(16).padStart(2, '0')}`;
    }
    

    return {
        height,
        width,
        URL,
        isLoading,
        type,
        setHeight,
        setWidth,
        setType,
    }
}