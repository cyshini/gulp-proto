# Gulp-proto

A clean and lightweight Gulp template for my personal projects, with all the useful and basic tools for starting awesome things. The project sources have to be committed to the master branch of your repository. The "gulp build" command will build the website in a "build" folder while the "gulp deploy" command will deploy it on a gh-pages branch... And that's it !

- - -

## Tools

- [Gulp + plugins](http://gulpjs.com/) *[Streaming build system]*
- [Bower](http://bower.io/) *[Package management]*
- [Foundation](http://foundation.zurb.com/) *[SASS Framework]*
- [GitHub Pages](http://pages.github.com) *[Deployment/hosting]*

## Requirement

You need to have `node`, `npm`, `gulp` and `bower` installed locally to run this project.

## Demo
[http://cyshini.github.io/gulp-proto/](http://cyshini.github.io/gulp-proto/)

## Getting Started

Set up your project in your code directory

    git clone git@github.com:cyshini/gulp-proto.git your-project-folder
    cd your-project-folder
    git remote rm origin
    git remote add origin your-git-url

Initialization

    npm install
    bower install

Compilation, auto-reloading server and watch on all files

    gulp

Build / distribution task (if command line show any error, simply run `gulp clean` and run again previous command)

    gulp build

Commit and push sources to your repository

    git commit -am "commit-message"
    git push origin master

Deploy on gh-pages (if command line show any error, simply run `gulp clean` and run again previous command)

    gulp deploy
