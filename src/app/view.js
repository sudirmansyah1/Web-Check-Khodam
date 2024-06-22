'use client';
import { useState } from "react"
import { khodamArray } from "@/lib/variable";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

export default function Component() {
    const [name, setName] = useState("");
    const [khodam, setKhodam] = useState({});
    const [loading, setLoading] = useState(false);
    // create register variable useForm
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // create function handle submit
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // get list of khodamArray then random fetch array [{value: ..., description: ...}] add timeout 3 detik for loading
            const khodamRandom = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(khodamArray[Math.floor(Math.random() * khodamArray.length)]);
                }, 3000);
            });
            setName(data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase());
            setKhodam(khodamRandom);
            //heading anchor to KhodamDetail
            document.getElementById("KhodamDetail").scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const ResetKhodamSearch = (data) => {
        setKhodam({});
        setName("");
        reset();
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-[#d0e9f2] to-[#e8f0f5] px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <Card className="w-full max-w-md rounded-2xl shadow-lg bg-white">
                <CardHeader>
                <CardTitle className="text-2xl font-bold">Temukan Khodam Anda</CardTitle>
                <CardDescription>Masukkan nama Anda untuk mempelajari tentang pelindung spiritual Anda.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6 sm:p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <Label htmlFor="name">Name</Label>
                        <input type="text"
                        {...register("name", { required: true })}
                        className="w-full p-2 pl-10 border-2 rounded-md text-sm text-gray-700"
                        placeholder="Masukkan nama Anda"
                        />
                    </div>
                    <Button className="w-full bg-black text-white">Lihat Khodam Saya</Button>
                </form>
                </CardContent>
            </Card>
            <div className="mt-8 w-full max-w-3xl" id="KhodamDetail">
                <Card className="rounded-xl border-0 shadow-lg bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14">
                    {loading ? "Loading..." : (Object.keys(khodam).length > 0 ? (<>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">{name} Khodam Kamu Adalah {khodam.label}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                {khodam.description}
                            </p>
                            <Button className="mt-10 w-full bg-black text-white" onClick={() => ResetKhodamSearch({})}>Reset</Button>
                        </CardContent>
                    </>) : (<>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Apa itu Khodam?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                            Khodam adalah pelindung atau penjaga spiritual yang diyakini ditetapkan untuk seseorang sejak lahir. Khodam dianggap memiliki karakteristik dan kekuatan unik yang dapat membimbing dan mendukung orang tersebut sepanjang hidupnya.
                            </p>
                            <p>
                            Memupuk hubungan dengan khodam Anda dapat membawa keseimbangan, kejelasan, dan pertumbuhan spiritual. Dengan memahami sifat khodam Anda, Anda dapat belajar untuk memanfaatkan kekuatannya dan bekerja selaras dengan pelindung spiritual Anda.
                            </p>
                        </CardContent>
                    </>))}
                </Card>
            </div>
        </div>
    )
}