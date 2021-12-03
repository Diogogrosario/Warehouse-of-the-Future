import path from "path";
import webpack from "webpack";

module.exports = {
	entry: "./src/index.tsx",
	mode: "production",
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/env", "@babel/preset-react", "@babel/preset-typescript"],
				},
			},
			{
				test: /\.tsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "ts-loader",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				loader: "file-loader",
			},
		],
	},
	resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
	output: {
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/dist/",
		filename: "bundle.js",
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "public/"),
		},
		devMiddleware: {
			publicPath: "/dist/",
		},
		port: 3000,
		host: "local-ip",
		hot: true,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
};
