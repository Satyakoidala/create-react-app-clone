const fs = require("fs");
const path = require("path");
const pwd = path.resolve();

async function createFolderAndCopyTemplate({ folder }) {
	if (folder) {
		fs.mkdir(path.join(pwd, folder), (err) => {
			if (err) {
				console.error("Something went wrong \n", err);
			}
		});

		console.log(`Created directory with ${folder} name successfully!\n`);
		console.log("Copying template...\n");
	}

	fs.cpSync(
		path.resolve(
			process.execPath,
			"../node_modules",
			"@satyakodes/create-react-app"
		),
		path.join(pwd, folder),
		{ recursive: true },
		(err) => {
			if (err) {
				console.error("File copying failed. \n", err);
			}
		}
	);
}

async function packageJsonOverride(details) {
	const { folder } = details;
	const pkgJson = require(path.resolve(pwd, folder || "", "package.json"));

	const overrides = ["name", "description", "author", "git"];
	let newPkgJson = { ...pkgJson };

	overrides.forEach((key) => {
		if (details[key]) {
			newPkgJson = {
				...newPkgJson,
				...(key === "git"
					? {
							repository: {
								type: "git",
								url: `git+${details[key]}`,
							},
					  }
					: {
							[key]: `${details[key]}`,
					  }),
			};
		}
	});

	// update package.json with input data
	fs.writeFile(
		path.resolve(pwd, folder, "package.json"),
		JSON.stringify(newPkgJson),
		(err) => {
			if (err) {
				console.error(
					"Package.json override file write operation failed.\n"
				);
			}
		}
	);
}

module.exports = {
	createFolderAndCopyTemplate,
	packageJsonOverride,
};
