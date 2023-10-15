fx_version 'cerulean'
game 'gta5'

author 'You'
version '1.0.0'

ui_page 'dist/index.html'

files {
    'dist/**/*.*',
    'dist/*.*',
}

fxdk_watch_command 'yarn' {'watch'}
fxdk_build_command 'yarn' {'build'}

client_scripts {'dist/client.js'}
server_script 'dist/server.js'
