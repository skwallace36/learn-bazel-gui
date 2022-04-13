const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const fsPromises = require('fs/promises');
const sleep = ms => new Promise(r => setTimeout(r, ms));

const getFirstMatch = (string, pattern) =>{
	const re = new RegExp(pattern, "g")
	const matches = string.match(re)
	return matches[0]
}

const getWorkspace = async (file) => {
	const contents = await fsPromises.readFile(file, `utf8`)
	const workspaceDef = getFirstMatch(contents, 'workspace\\(name = ".*"\\)')
	const workspaceName = getFirstMatch(workspaceDef, '\"\(.*)\\"').slice(1, -1)
	console.log(file)
	console.log(workspaceName)
	return {name: workspaceName, path: path.parse(file).dir}
}

async function getWorkspaces(store, route, args) {
	try {
		const { stdout, stderr } = await exec('find $HOME -name WORKSPACE 2>&1 | grep -v "Permission denied" | grep -v "Operation not permitted"');
		const filtered = stdout.split("\n").filter((item) => item.length > 0)
		const sorted = filtered.sort((a,b) => {
			return a.length - b.length
		})
		let parentDirs = sorted.map((file) => { return path.parse(file).dir })
		let remove = new Set()
		var firstPointer = 0
		var secondPointer = 0
		while(firstPointer < parentDirs.length - 1) { 
			secondPointer = firstPointer + 1
			while(secondPointer < parentDirs.length === true) {
				if (parentDirs.at(secondPointer).startsWith(parentDirs.at(firstPointer)) === true) {
					remove.add(secondPointer)
				}
				secondPointer = secondPointer + 1
			}
			firstPointer = firstPointer + 1 
		}
		let filteredParentDirs = parentDirs.filter((item, index) => {
			if (remove.has(index)) { return false}
			return true
		})
		
		const unresolvedResults = filteredParentDirs.map((parentDir) => (getWorkspace(`${parentDir}/WORKSPACE`)))
		const resolvedResults = await Promise.all(unresolvedResults)
		store.set(`routes.${route}`, {
			data: { workspaces: resolvedResults }
		})
		return { workspaces: resolvedResults }
	} catch(err) {
		console.log('get workspaces error catch')
		console.log(err);
	}
}

async function getPackages(store, route, args) {
	try {
		const workspace = route.split(":")[2]
		const { stdout, stderr } = await exec('bazel query //... --output package', { cwd: `${workspace}`} );
		const results = stdout.split("\n")
		store.set(`routes.${route}`, {
			workspace: `${workspace}`,
			data: { packages: results }
		})
		return { packages: results }
	} catch(err) {
		console.log('get packages error catch')
		console.log(err);
	}
}


async function getTargets(store, route, args) {
	try {
		const workspace = route.split(":")[2]
		// const { stdout, stderr } = await exec('bazel query //...', { shell: '/bin/zsh', cwd: `${args.workspace}`} );
		const { stdout, stderr } = await exec('bazel query //...', { cwd: `${workspace}`} );
		const results = stdout.split("\n")
		store.set(`routes.${route}`, {
			workspace: `${workspace}`,
			data: { targets: results }
		})
		return { targets: results }
	} catch(err) {
		console.log('get targets error catch')
		console.log(err);
	}
}


async function setSettings(store, route, args) {
	const splitRoute = route.split(":")
	const setting = splitRoute[2]
	const value = args
	store.set(`settings.${setting}`, value)
	return 'success'
}

async function getSettings(store, route, args) {
	const splitRoute = route.split(":")
	const setting = splitRoute[2]
	const settingFromStore = await store.get(`settings.${setting}`)
	return settingFromStore
}


function asyncRouter(route) {
	const splitRoute = route.split(":")
	const domain = splitRoute[0]
	const action = splitRoute[1]
	switch (`${domain}:${action}`) {
		case 'packages:get':
			return getPackages
		case 'targets:get':
			return getTargets
		case 'workspaces:get':
			return getWorkspaces
		case `settings:get`:
			return getSettings
		case `settings:set`:
			return setSettings
		default:
			console.log('bad route')
			return 'bad route'
	}
}

module.exports.asyncRouter = asyncRouter;