"use client";

import React, { useState } from 'react';
import { reformat_millie } from '@/utils/reformat_millie';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Send, RefreshCw, Sparkles, Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion';

const Form = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = reformat_millie(inputValue);
            setOutputValue(response);
        } catch (error) {
            console.error('Error processing input:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setInputValue('');
        setOutputValue([]);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(outputValue.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-zinc-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl"
            >
                <Card className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-purple-500/20">
                    <CardContent className="p-4 sm:p-6 md:p-8">
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center mb-8 sm:mb-12"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Sparkles className="text-purple-400 w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-0 sm:mr-4" />
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-zinc-100">
                                Millie Reformatter
                            </h1>
                        </motion.div>
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                            <div className="relative group">
                                <Textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="밀리의 서재 하이라이트를 복사 / 붙여넣으세요!"
                                    className="w-full h-36 sm:h-48 bg-zinc-800/50 rounded-xl border-2 border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 text-zinc-100 placeholder-zinc-400 p-3 sm:p-4 transition duration-300 ease-in-out text-sm sm:text-base"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-purple-300/20 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out pointer-events-none"></div>
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-400 hover:to-purple-300 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                >
                                    {isLoading ? (
                                        <motion.div
                                            className="flex items-center justify-center"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <Loader2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                                            Processing
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            className="flex items-center justify-center"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Send className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                                            Reformat
                                        </motion.div>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleReset}
                                    className="flex-1 sm:flex-initial bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg border border-zinc-700 text-sm sm:text-base"
                                >
                                    <motion.div
                                        className="flex items-center justify-center"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <RefreshCw className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                                        Reset
                                    </motion.div>
                                </Button>
                            </div>
                        </form>
                        <AnimatePresence>
                            {outputValue.length > 0 && (
                                <motion.div
                                    className="mt-8 sm:mt-12"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-4 sm:mb-6">Reformatted Text:</h2>
                                    <div className="bg-zinc-800/50 rounded-xl p-4 sm:p-6 overflow-x-auto border border-purple-500/30 relative">
                                        <pre className="text-zinc-100 whitespace-pre-wrap break-words text-xs sm:text-sm">
                                            {outputValue.join('\n')}
                                        </pre>
                                        <Button
                                            onClick={handleCopy}
                                            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-purple-500/20 hover:bg-purple-400/30 text-purple-300 rounded-lg p-1.5 sm:p-2 transition duration-300 ease-in-out"
                                        >
                                            {copied ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : <Copy className="h-4 w-4 sm:h-5 sm:w-5" />}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Form;
