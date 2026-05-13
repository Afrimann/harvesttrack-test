"use client";

import { Dispatch, SetStateAction } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

interface LoginFormProps {
  setShowPage: Dispatch<SetStateAction<boolean>>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

const buttonHoverVariants = {
  hover: { y: -4, transition: { duration: 0.2 } },
};

const toggleVariants = {
  hover: { color: "#2E9E52", scale: 1.02 },
};

export default function LoginForm({ setShowPage }: LoginFormProps) {
  return (
    <motion.div
      className="w-full max-w-[520px]"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <motion.div
        className="bg-white lg:shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-8 py-6"
        layout
      >
        <motion.div
          className="mb-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-[24px] font-[500] font-semibold">
            Log in to your account
          </h1>
          <p className=" text-[14px] text-[#6B7280]">
            Welcome back! Please enter your details
          </p>
        </motion.div>

        <motion.form
          className="flex flex-col gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <motion.label
              htmlFor="email"
              className="label"
              variants={itemVariants}
            >
              Email
            </motion.label>
            <motion.input
              id="email"
              type="email"
              placeholder="Enter Email address"
              className="input h-[48px]"
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            />
            <motion.span
              className="text-[12px] text-[#2E9E52]"
              variants={itemVariants}
            >
              davidxxx@email.com
            </motion.span>
          </motion.div>

          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <motion.label
              htmlFor="password"
              className="label"
              variants={itemVariants}
            >
              Password
            </motion.label>
            <motion.input
              id="password"
              type="password"
              placeholder="Enter password"
              className="input h-[48px]"
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            />
          </motion.div>

          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <motion.button
              type="submit"
              className="btn-primary w-full"
              whileHover={{ scale: 0.99 }}
              whileTap={{ scale: 0.97 }}
            >
              Sign In
            </motion.button>

            <motion.div
              className="flex items-center gap-3"
              variants={itemVariants}
            >
              <div className="h-px flex-1 bg-[#E5E5E5]" />
              <span className="text-[13px] text-[#6B7280]">or</span>
              <div className="h-px flex-1 bg-[#E5E5E5]" />
            </motion.div>

            <motion.button
              type="button"
              className="btn-secondary w-full flex items-center justify-center gap-4 shadow-md"
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap={{ y: -2 }}
            >
              <FcGoogle className="text-[18px] md:text-[20px]" />
              Continue with Google
            </motion.button>
          </motion.div>
        </motion.form>

        <motion.div
          className="mt-6 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-[13px] text-[#6B7280]">
            Don&apos;t have an account?{" "}
            <motion.a
              className="text-[#2E9E52] font-semibold underline cursor-pointer"
              onClick={() => setShowPage(true)}
              variants={toggleVariants}
              whileHover="hover"
            >
              Sign up
            </motion.a>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
