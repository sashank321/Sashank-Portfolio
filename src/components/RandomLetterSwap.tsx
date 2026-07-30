import * as React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
const useIsStaticRenderer = () => false
import { motion, useAnimate, type AnimationOptions } from "framer-motion"

export default function RandomLetterSwap(props: Props) {
    props = { ...COMPONENT_DEFAULTS, ...props }
    const {
        label,
        mode,
        reverse,
        staggerDuration,
        ease,
        font,
        color,
        onClick,
        style,
    } = props

    const isStatic = useIsStaticRenderer()
    const [scope, animate] = useAnimate()
    const [blocked, setBlocked] = useState(false)

    const transition: AnimationOptions = useMemo(
        () => (ease ?? { type: "spring", duration: 0.8 }) as AnimationOptions,
        [ease]
    )

    const shuffleArray = (arr: number[]): number[] => {
        const a = [...arr]
        a.sort(() => Math.random() - 0.5)
        return a
    }

    const mergeDelay = (base: AnimationOptions, i: number): AnimationOptions =>
        ({
            ...base,
            delay: i * (staggerDuration ?? 0.1),
        }) as AnimationOptions

    const debouncedHoverStartRef = useRef<(() => void) | null>(null)
    const debouncedHoverEndRef = useRef<(() => void) | null>(null)
    const timerRefs = useRef<{
        startTimer: ReturnType<typeof setTimeout> | null
        startTrailing: boolean
        endTimer: ReturnType<typeof setTimeout> | null
        endTrailing: boolean
    }>({
        startTimer: null,
        startTrailing: false,
        endTimer: null,
        endTrailing: false,
    })

    useEffect(() => {
        if (isStatic) return

        const letterIdxs: number[] = []
        const len = label ? label.length : 0
        for (let k = 0; k < len; k++) {
            if (label[k] !== " ") letterIdxs.push(k)
        }
        const count = letterIdxs.length

        const runForward = () => {
            if (blocked || count === 0) return
            setBlocked(true)
            const order = shuffleArray(letterIdxs)
            for (let i = 0; i < order.length; i++) {
                const idx = order[i]
                const isLast = i === order.length - 1
                animate(
                    `.letter-${idx}`,
                    { y: reverse ? "100%" : "-100%" },
                    mergeDelay(transition, i)
                ).then(() => {
                    animate(`.letter-${idx}`, { y: 0 }, { duration: 0 })
                })
                animate(
                    `.letter-secondary-${idx}`,
                    { top: "0%" },
                    mergeDelay(transition, i)
                ).then(() => {
                    animate(
                        `.letter-secondary-${idx}`,
                        { top: reverse ? "-100%" : "100%" },
                        { duration: 0 }
                    ).then(() => {
                        if (isLast) setBlocked(false)
                    })
                })
            }
        }

        const runPingStart = () => {
            if (count === 0) return
            const order = shuffleArray(letterIdxs)
            for (let i = 0; i < order.length; i++) {
                const idx = order[i]
                animate(
                    `.letter-${idx}`,
                    { y: reverse ? "100%" : "-100%" },
                    mergeDelay(transition, i)
                )
                animate(
                    `.letter-secondary-${idx}`,
                    { top: "0%" },
                    mergeDelay(transition, i)
                )
            }
        }

        const runPingEnd = () => {
            if (count === 0) return
            const order = shuffleArray(letterIdxs)
            for (let i = 0; i < order.length; i++) {
                const idx = order[i]
                animate(`.letter-${idx}`, { y: 0 }, mergeDelay(transition, i))
                animate(
                    `.letter-secondary-${idx}`,
                    { top: reverse ? "-100%" : "100%" },
                    mergeDelay(transition, i)
                )
            }
        }

        const wait = 100
        const t = timerRefs.current

        const startBody = mode === "pingpong" ? runPingStart : runForward
        const endBody = runPingEnd

        debouncedHoverStartRef.current = () => {
            if (!t.startTimer) {
                startBody()
                t.startTimer = setTimeout(() => {
                    if (t.startTrailing) startBody()
                    t.startTrailing = false
                    t.startTimer = null
                }, wait)
            } else {
                t.startTrailing = true
            }
        }

        debouncedHoverEndRef.current = () => {
            if (!t.endTimer) {
                endBody()
                t.endTimer = setTimeout(() => {
                    if (t.endTrailing) endBody()
                    t.endTrailing = false
                    t.endTimer = null
                }, wait)
            } else {
                t.endTrailing = true
            }
        }

        return () => {
            if (t.startTimer) clearTimeout(t.startTimer)
            if (t.endTimer) clearTimeout(t.endTimer)
            t.startTimer = null
            t.endTimer = null
            t.startTrailing = false
            t.endTrailing = false
        }
    }, [
        isStatic,
        mode,
        reverse,
        staggerDuration,
        transition,
        animate,
        label,
        blocked,
    ])

    const hoverStart = () => {
        debouncedHoverStartRef.current?.()
    }
    const hoverEnd = () => {
        debouncedHoverEndRef.current?.()
    }

    const srOnlyStyle: React.CSSProperties = {
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
    }

    const typeface = (font ?? {}) as Record<string, any>
    const fontCss = Object.fromEntries(
        Object.entries(typeface).filter(([k]) => k !== "textAlign")
    )

    const innerSpanStyle: React.CSSProperties = {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        ...fontCss,
        color,
        cursor: onClick ? "pointer" : undefined,
    }

    const letters = label ? label.split("") : []
    const secondaryRestingTop = reverse ? "-100%" : "100%"

    const interactive = !isStatic

    useEffect(() => {
        if (isStatic || !scope.current) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                debouncedHoverStartRef.current?.();
            } else {
                debouncedHoverEndRef.current?.();
            }
        }, { threshold: 0.5 });
        
        observer.observe(scope.current);
        return () => observer.disconnect();
    }, [isStatic, scope]);

    const handlers = !interactive
        ? {}
        : {
                onClick,
            }

    // Stable random characters so they don't jump around on re-renders
    const randomChars = useMemo(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        return letters.map((l) => (l === " " ? " " : chars[Math.floor(Math.random() * chars.length)]));
    }, [letters]);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...style,
            }}
        >
            {letters.length === 0 ? null : (
                <span ref={scope} style={innerSpanStyle} {...handlers}>
                    <span style={srOnlyStyle}>{label}</span>
                    {letters.map((letter, i) => (
                        <span
                            key={i}
                            aria-hidden
                            style={{
                                whiteSpace: "pre",
                                position: "relative",
                                display: "flex",
                            }}
                        >
                            <motion.span
                                className={`letter-${i}`}
                                style={{
                                    position: "relative",
                                    top: 0,
                                }}
                            >
                                {randomChars[i]}
                            </motion.span>
                            <motion.span
                                className={`letter-secondary-${i}`}
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    right: 0,
                                    top: secondaryRestingTop,
                                }}
                            >
                                {letter}
                            </motion.span>
                        </span>
                    ))}
                </span>
            )}
        </div>
    )
}

type Props = {
    label?: string
    mode?: "forward" | "pingpong"
    reverse?: boolean
    staggerDuration?: number
    ease?: AnimationOptions
    font?: Record<string, any>
    color?: string
    onClick?: () => void
    style?: React.CSSProperties
}

const COMPONENT_DEFAULTS: Props = {
    label: "LETTER SWAP",
    mode: "pingpong",
    reverse: false,
    staggerDuration: 0.1,
    font: {
        fontFamily: "Inter",
        variant: "Medium",
        fontSize: 120,
        lineHeight: "1.2em",
        letterSpacing: "0em",
        textAlign: "center",
    },
    color: "#FFFFFF",
    ease: {
        type: "spring",
        duration: 0.8,
    },
}
