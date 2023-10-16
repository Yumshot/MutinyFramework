fx_version 'bodacious'
game 'gta5'

author 'You'
version '1.0.0'



files {
    'dist/index.html',
    'dist/assets/**.*',
    'dist/assets/**.css',
    'dist/assets/**.js',
    'dist/assets/**.png',
    'dist/assets/**.mp3',
    'dist/**.*',
}
client_script 'dist/client.js'
server_script 'dist/server.js'
loadscreen_manual_shutdown 'yes'
loadscreen 'dist/index.html'
loadscreen_cursor 'yes'