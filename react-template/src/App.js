import React from "react";
import "./styles/app.scss";
import reactLogo from "./assets/image.png";

const App = () => {
	return (
		<>
			<h2 className="header">
				This App is primarily built using webpack and runs on
				react@v18.2.0
			</h2>
			<div className="container">
				<div className="left">
					<legend>Module Support</legend>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Version</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>webpack</td>
								<td>v5.75.0</td>
							</tr>
							<tr>
								<td>webpack-dev-server</td>
								<td>v4.11.1</td>
							</tr>
							<tr>
								<td>webpack-merge</td>
								<td>v5.9.0</td>
							</tr>
							<tr>
								<td>dotenv-webpack</td>
								<td>v8.1.0</td>
							</tr>
							<tr>
								<td>eslint</td>
								<td>v8.30.0</td>
							</tr>
							<tr>
								<td>stylelint</td>
								<td>v14.16.0</td>
							</tr>
							<tr>
								<td>sass</td>
								<td>v1.56.2</td>
							</tr>
							<tr>
								<td>sass-loader</td>
								<td>v13.3.2</td>
							</tr>
							<tr>
								<td>babel-loader</td>
								<td>v9.1.0</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="right">
					<img src={reactLogo} alt="react logo" />
				</div>
			</div>
		</>
	);
};

export default App;
