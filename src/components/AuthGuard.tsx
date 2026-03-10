import { useState, useEffect } from "react";
import { Lock, Heart } from "lucide-react";
import { motion } from "framer-motion";

// The SHA-256 hash of the passcode (currently set to "XXXXXX")
// This ensures the actual password isn't plainly visible in the source code!
const SECRET_HASH = "c2df590a5f70d7230cf4131fe43b3afc683d28959908127f7f1796d907d0b297";

interface AuthGuardProps {
    children: React.ReactNode;
}

// Helper function to hash a string using Web Crypto API
async function hashPasscode(passcode: string) {
    const msgBuffer = new TextEncoder().encode(passcode);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    // On mount, check if they already authenticated in the past
    useEffect(() => {
        const authStatus = localStorage.getItem("isAshaAuthenticated");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsChecking(true);

        try {
            const inputHash = await hashPasscode(passcode.trim().toLowerCase());

            if (inputHash === SECRET_HASH) {
                localStorage.setItem("isAshaAuthenticated", "true");
                setIsAuthenticated(true);
                setError(false);
            } else {
                setError(true);
                setPasscode("");
                // Clear error shake effect after animation
                setTimeout(() => setError(false), 500);
            }
        } catch (err) {
            console.error("Hashing failed", err);
        } finally {
            setIsChecking(false);
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-1/4 left-1/4 text-primary/10 -rotate-12">
                <Heart className="w-24 h-24" />
            </div>
            <div className="absolute bottom-1/4 right-1/4 text-primary/10 rotate-12">
                <Heart className="w-32 h-32" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-secondary/40 backdrop-blur-md p-8 rounded-2xl border border-gold/20 shadow-xl text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-gold" />
                    </div>

                    <h1 className="font-heading text-4xl text-cream mb-2">Restricted Area</h1>
                    <p className="font-display text-muted-foreground mb-8">
                        Please enter the secret passcode to continue. <br />
                        <span className="text-sm opacity-70 italic">(Hint: the day we started dating, in DDMMYY format)</span>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.div
                            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <input
                                type="password"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                placeholder="Enter passcode..."
                                className={`w-full bg-background border ${error ? 'border-red-500' : 'border-gold/30'} rounded-lg px-4 py-3 text-center text-lg text-cream focus:outline-none focus:border-gold transition-colors`}
                            />
                        </motion.div>

                        {error && (
                            <p className="text-red-400 text-sm font-display">Incorrect passcode. Try again!</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display text-lg py-3 rounded-lg transition-colors mt-4"
                        >
                            Unlock
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
