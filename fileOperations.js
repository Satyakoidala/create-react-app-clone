const fs = require("fs");
const path = require("path");
const { TEMPLATE } = require("./constant");
const PWD = path.resolve();

async function createFolderAndCopyTemplate({ folder }) {
	if (folder) {
		fs.mkdir(path.join(PWD, folder), (err) => {
			if (err) {
				console.error("Something went wrong \n", err);
			}
		});

		console.log(`Created directory with ${folder} name successfully!\n`);
		console.log("Copying template...\n");
	}

	fs.cpSync(
		process.platform === "win32"
			? path.resolve(process.execPath, "../node_modules", TEMPLATE)
			: path.resolve("/usr/local/lib/node_modules", TEMPLATE),
		path.join(PWD, folder),
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
	const pkgJson = require(path.resolve(PWD, folder || "", "package.json"));

	const overrides = ["name", "description", "author", "git"];
	let newPkgJson = { ...pkgJson, version: "0.0.0", keywords: [] };

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
							homepage: `${details[key]}#readme`,
							bugs: {
								url: `${details[key]}/issues`,
							},
					  }
					: {
							[key]: `${details[key]}`,
					  }),
			};
		}
	});

	const keysToDelete = ["license", "preferGlobal", "publishConfig"];

	keysToDelete.forEach((key) => delete newPkgJson[key]);

	// update package.json with input data
	fs.writeFile(
		path.resolve(PWD, folder, "package.json"),
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

async function cleanUp(folder) {
	console.log("Cleaning the project folder..\n");

	const folderPath = `./${folder}/node_modules`;

	fs.rm(folderPath, { recursive: true, force: true }, (err) => {
		if (err) {
			console.error(`Error deleting folder: ${err.message}`);
			return;
		}
	});
}

module.exports = {
	createFolderAndCopyTemplate,
	packageJsonOverride,
	cleanUp,
};
