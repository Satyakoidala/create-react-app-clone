const { spawn } = require("child_process");

module.exports = async function (packageName) {
	if (!packageName) {
		throw new Error("Package name is required.\n");
	}

	console.log(`Installing ${packageName} globally...\n`);

	return new Promise((resolve, reject) => {
		const installProcess = spawn(
			"npx",
			["npm", "install", "-g", packageName],
			{
				stdio: "inherit", // Inherit stdin, stdout, and stderr
				shell: process.platform === "win32", // Use shell on Windows
			}
		);

		installProcess.on("close", (code) => {
			if (code !== 0) {
				reject(
					new Error(
						`Failed to install ${packageName}. Exit code: ${code}`
					)
				);
				return;
			}
			console.log(`Successfully installed ${packageName}.\n`);
			resolve();
		});
	});
};
