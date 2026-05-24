"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

interface ExitConfirmModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export function ExitConfirmModal({ onConfirm, onCancel }: ExitConfirmModalProps) {
    const t = useTranslations("GameHeader");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm "
            onClick={onCancel}
        >
            <div
                className="relative w-[320px] rounded-3xl overflow-hidden shadow-2xl bg-white border-2"
                style={{ animation: "modalIn 0.35s ease-out" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Title */}
                <div className="pt-6 pb-2 text-center">
                    <h2 className="text-2xl font-extrabold text-[#FF6B6B] mt-1">
                        {t("exitTitle")}
                    </h2>
                </div>

                {/* Images */}
                <div className="flex justify-center items-end gap-2 py-4">
                    <Image
                        src="/images/Nong_brite/nong-brite-02.svg"
                        alt="Nong Brite"
                        width={70}
                        height={70}
                        className="object-contain"
                    />
                </div>

                {/* Message */}
                <p className="text-center text-gray-400 text-xs pb-4 px-6">
                    {t("exitMessage")}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 px-6 pb-6">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 text-sm font-bold hover:bg-gray-200 transition-colors"
                    >
                        {t("continue")}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
                    >
                        {t("exit")}
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.9) translateY(20px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    );
}
