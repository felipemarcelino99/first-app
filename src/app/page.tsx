"use client"
import ButtonType from "@/components/ButtonType";
import CustomImage from "@/components/CustomImage";
import Input from "@/components/Input";
import useCustomImage from "../../hooks/useCustomImage";

export default function Home() {
  const {
    height,
    width,
    URL,
    isLoading,
    type,
    setHeight,
    setWidth,
    setType,
  } = useCustomImage();

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}>
      <div className={`flex flex-col items-center justify-center gap-5 rounded-md border-2 border-pink-400 p-7`}>
        
        <CustomImage url={URL} width={width} height={height} isLoading={isLoading} />

        <div className={`w-full flex items-center justify-between gap-5`}>
            <ButtonType title="ABSTRATO" value="abstract" type={type} setType={setType} />
            <ButtonType title="PESSOA" value="person" type={type} setType={setType} />
            <ButtonType title="CIDADE" value="city" type={type} setType={setType} />
        </div>

        <div className={`w-full flex items-center justify-between gap-5`}>
            <div>
              <label className={`text-pink-400 text-xs`}>Altura</label>
              <Input placeholder="Altura" setValue={setHeight} value={height}/>
            </div>
            <div>
              <label className={`text-pink-400 text-xs`}>Largura</label>
              <Input placeholder="Largura" setValue={setWidth} value={width}/>
            </div>
        </div>
      </div>
    </main>
  )
}
