import typescript from "@rollup/plugin-typescript"

export default [
    // CJS output
    {
        input: "index.ts", // 指定入口文件
        output: {
            file: "dist/index.cjs.js",
            format: "cjs",
        },
        plugins: [typescript()],
    },
    // ESM output
    {
        input: "index.ts",
        output: {
            file: "dist/index.esm.js",
            format: "es",
        },
        plugins: [typescript()],
    }
];