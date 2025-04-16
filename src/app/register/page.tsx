'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from "next/navigation"

const schema = z.object({
    isim: z.string().min(2, { message: 'İsim en az 2 karakter olmalı' }),
    email: z.string().email({ message: 'Geçerli bir email adresi girin' }),
    sifre: z.string().min(6, { message: 'Şifre en az 6 karakter olmalı' }),
})

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {

    const [mesaj, setMesaj] = useState<string>("")
    const router = useRouter()

    const {
        register, handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch('/api/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            const sonuc = await res.json();
            console.log("Sunucudan gelen cevap:", sonuc)

            setMesaj("✅ Kayıt başarılı! Yönlendiriliyorsunuz...")

            reset();

            setTimeout(() => {
                router.push("/login")
            }, 2000)

        } catch (err) {
            console.error("Hata:", err);
            setMesaj("❌ Kayıt sırasında bir hata oluştu.");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Kayıt Ol</h2>
            {mesaj && (
                <div className="p-2 bg-green-100 text-green-700 border border-green-300 rounded mb-4">
                    {mesaj}
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        {...register("isim")}
                        placeholder="İsim"
                        className="w-full p-2 border rounded"
                    />
                    {errors.isim && (
                        <p className="text-red-500 text-sm">{errors.isim.message}</p>
                    )}
                </div>

                <div>
                    <input
                        {...register("email")}
                        placeholder="E-posta"
                        className="w-full p-2 border rounded"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <input
                        {...register("sifre")}
                        type="password"
                        placeholder="Şifre"
                        className="w-full p-2 border rounded"
                    />
                    {errors.sifre && (
                        <p className="text-red-500 text-sm">{errors.sifre.message}</p>
                    )}
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Gönder
                </button>
            </form>
        </div>
    );

}