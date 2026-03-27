// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("node:path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/** @type {import("webpack").Configuration} */
const config = {
	entry: "./src/index.ts",

	target: "web",

	//devtool: "inline-source-map",

	experiments: {
		outputModule: true, // this needs to be added to build a library target as ESM
	},

	plugins: [
		new CopyWebpackPlugin({
			patterns: [{ from: "public/assets", to: "assets" }],
		}),
	],

	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: "ts-loader",
				exclude: ["/node_modules/"],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: "asset",
			},
		],
	},

	resolve: {
		extensions: [".ts", ".js", "..."],
	},

	performance: {
		maxAssetSize: 512000,
	},

	output: {
		libraryTarget: "module", // and also this — which requires the previous block
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
	},
};

module.exports = () => {
	config.mode = process.env.NODE_ENV === "production" ? "production" : "development";

	// config.node = {
	// 	__filename: "eval-only",
	// 	__dirname: "eval-only",
	// };

	return config;
};
