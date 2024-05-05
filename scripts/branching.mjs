// We use the child_process module to execute shell commands.
import { exec } from 'node:child_process';
import util from 'node:util';

const execP = util.promisify(exec);

/**
 * The handleError function logs the error and exits the script.
 * @param {*} error
 */
const handleError = (error) => {
  console.error(error);
  process.exit(1);
};

/**
 * splits the input string by newline characters, then splits the first line by tab characters,
 * and finally returns the first part which should be the remote name.
 *
 * @param {string} remoteString
 */
const splitRemote = (remoteString) => {
  // Split the string by newline character
  const lines = remoteString.split('\n');

  // Extract the first line
  const firstLine = lines[0];

  // Split the first line by tab character
  const parts = firstLine.split('\t');

  // Extract the first part, which should be the remote name
  const remoteName = parts[0];

  return remoteName;
};

/**
 * fetches the configured remote name using git remote -v
 *
 * Get the configured remote name (usually "origin")
 */
const getRemoteName = async () => {
  try {
    const { stdout } = await execP('git remote -v');

    const remoteName = splitRemote(stdout);

    if (remoteName) {
      return remoteName;
    }

    throw new Error('No remote found');
  } catch (error) {
    handleError(error);
  }
};

/**
 * Push a single branch.
 *
 * takes the remote name and branch name and pushes the branch with git push
 * @param {string} remoteName
 * @param {string} branchName
 */
const pushBranch = async (remoteName, branchName) => {
  try {
    await execP(`git push ${remoteName} ${branchName}`);
    console.log(`Pushed branch ${branchName} to ${remoteName}`);
  } catch (error) {
    console.error(`Error pushing branch ${branchName}: ${error}`);
    throw error;
  }
};

/**
 * Get all local branches (excluding detached HEAD)
 *
 * retrieves the list of local branches using git branch --list
 * and filters out the current branch (marked with asterisk)
 *
 * @returns
 */
const getLocalBranches = async () => {
  try {
    const { stdout } = await execP('git branch --list');

    // result of stdout
    /**
      foo
      bar
    * main
      baz
      quox
    */

    const branches = stdout
      .split('\n')
      .map((s) => s.trim())
      .filter((branch) => branch && !branch.startsWith('*')); // Exclude current branch

    return branches;
  } catch (error) {
    handleError(error);
  }
};

(async () => {
  try {
    // We first get the remote name and all local branches.
    const remoteName = await getRemoteName();

    const branches = await getLocalBranches();

    for (const branch of branches) {
      await pushBranch(remoteName, branch);
    }

    console.log('All local branches pushed successfully!');
  } catch (error) {
    handleError(error);
  }
})();
