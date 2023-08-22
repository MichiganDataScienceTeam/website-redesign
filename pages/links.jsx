import Layout from "@/components/layout";
import Hero from "@/components/hero";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/icon";
import HeadContent from "@/components/headContent";
import fs from "fs";
import path from "path";
import React, { useState } from 'react';
export default function Links({ linksjson }) {
    const [showToast, setShowToast] = useState(false);

    return (
        <div>
            <HeadContent title={"Michigan Data Science Team - Links"} />
            <Image className="mx-auto" width={100} height={100} alt="MDST - Michigan Data Science Team Links Logo" src={"/images/favicon.png"} />
            <h1 className=" lg:text-3xl text-2xl font-bold text-center">
                MDST - Michigan Data Science Team Links
            </h1>
            <div className={`fixed top-4 ${showToast ? '' : '-translate-y-40'} duration-75	transition-transform left-1/2 transform -translate-x-1/2 p-2 bg-green-600 rounded text-white `}>
                Copied!
            </div>

            <div className="py-8 px-2 flex flex-col justify-center items-center gap-4">
                {
                    linksjson.map((link) => (
                        <LinkElement key={link.name} link={link} toast={() => {
                            setShowToast(true)
                            setTimeout(() => {
                                setShowToast(false);
                            }, 2000);
                        }} />
                    ))
                }
            </div>
        </div>
    );
}

function LinkElement({ link, toast }) {
    return (<Link
        key={link.name}
        href={link.href}
        target="_blank"
        className={link?.color === "primary" ? "p-4 bg-primary rounded-lg grid w-72 items-center gap-6 link" : "p-4 bg-grey rounded-lg grid w-72 items-center gap-6 link"}
    >
        <Icon name={link.icon_name} className="text-4xl" />
        <h2 className="font-bold text-lg">{link.name}</h2>
        <ShareButton link={link} toast={toast} />
    </Link>)
}

function ShareButton({ link, toast }) {
    const sharePage = (e) => {
        e.preventDefault()
        if (navigator.share) {
            navigator.share({
                title: 'MDST ' + link.name,
                url: link.href,
            })
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            console.log('Web Share API not supported');
            navigator.clipboard.writeText(link.href)
            toast()
        }
    };
    return (
        <button onClick={sharePage}><Icon name="copy" className="text-2xl self-end" /></button>
    );
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "config", "links.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const linksjson = JSON.parse(fileContent);
    return { props: { linksjson } };
}