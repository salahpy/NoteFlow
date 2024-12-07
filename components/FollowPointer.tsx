import stringToColor from "@/lib/stringToColors"
import { motion } from "framer-motion"
import React from "react"

const FollowPointer = ({
  x,
  y,
  info,
}: {
  x: number
  y: number
  info: { name: string; email: string; avatar: string }
}) => {
  const color = stringToColor(info.email || "1")
  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke={color}
        fill="none"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 text-[color] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-[color]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a5.5 5.5 0 0 1 103.557l2.528 15.467a5.5 0 0 1..."></path>
      </svg>
      <motion.div
        style={{
          backgroundColor: color,
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className={
          "px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full"
        }
      >
        {info?.name || info.email}
      </motion.div>
    </motion.div>
  )
}

export default FollowPointer
