# YouTube Video Downloader with Audio Merging

This script allows you to download a YouTube video along with its highest quality audio and merges them into a single video file.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- npm (Node Package Manager) is available

## Installation

1. Clone the repository or download the script file (`index.js`).

```bash
git clone https://github.com/tnshgarg/yt-video-downloader.git
cd yt-video-downloader

```
## Usage
Run the script with the following command, providing the YouTube video URL as a command-line argument:

`node index.js [YouTube Video URL]`
Replace [YouTube Video URL] with the actual URL of the YouTube video you want to download.

The downloaded video with merged audio will be saved in the /Users/tanishgarg/Downloads/ directory with a randomly generated name.

## Creating an Alias (macOS)
To create an alias for the script, follow these steps:

1. Open your shell profile file in a text editor. If it doesn't exist, you can create it.

2. `nano ~/.bash_profile`
If you are using Zsh, you may need to edit ~/.zshrc instead.

3. Add an alias for your command at the end of the file:
`alias download='node /path/to/your/index.js'`

4. Replace /path/to/your/download-script.js with the actual path to your JavaScript file.

5. Save the file and exit the text editor.

6. Reload your profile to apply the changes:
`source ~/.bash_profile`

Or for Zsh:
`source ~/.zshrc`
Now, you can use the download alias followed by the YouTube video URL in your terminal:

`download https://www.youtube.com/watch?v=Opyd-GTbAMc`

## Creating an Alias (Windows)

On Windows, you can create a command alias using the doskey command. Follow these steps:

1. Open a Command Prompt with administrator privileges.

2. Run the following command to create an alias:

3. `doskey download=node C:\path\to\your\download-script.js $*`
Replace C:\path\to\your\download-script.js with the actual path to your JavaScript file.

4. Press Enter to execute the command.

5. Now, you can use the download alias followed by the YouTube video URL in your Command Prompt:

`download https://www.youtube.com/watch?v=Opyd-GTbAMc`
