const prompt = require("prompt-sync")();
const installGlobal = require("./installGlobal");
const {
	createFolderAndCopyTemplate,
	packageJsonOverride,
	cleanUp,
} = require("./fileOperations");

let folder;

async function main() {
	console.log("\n");
	const name = prompt("Name of the project: ");
	console.log("\n");
	folder = prompt("Folder Name? (./) ") || "";
	console.log("\n");
	const description = prompt("Enter Description: ");
	console.log("\n");
	const author = prompt("Author: ");
	console.log("\n");
	const gitURI = prompt("Enter Git: ");
	console.log("\n");

	const details = {
		folder,
		name,
		description,
		author,
		git: gitURI,
	};

	// install template package globally
	await installGlobal("@satyakodes/create-react-app");

	// create new folder and copy template
	await createFolderAndCopyTemplate(details).then(() => {
		console.log(
			`React template from @satyakodes/create-react-app is copied successfully!\n`
		);
	});

	// override template package.json with input details
	await packageJsonOverride(details);

	// cleanup the project folder
	await cleanUp(folder).then(() => {
		console.log(`Cleaned the project folder successfully!\n`);
	});
}

main().then(() => {
	if (folder) {
		console.log(`Run 'cd ${folder}'\n`);
	}
	console.log("Run 'npm i'\n");
	console.log("Happy Coding!!\n");
});
