# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [8.0.2](https://github.com/dmnsgn/async-preloader/compare/v8.0.1...v8.0.2) (2023-02-09)


### Bug Fixes

* force @types/css-font-loading-module to 0.07 and update tsconfig target ([4ca26f9](https://github.com/dmnsgn/async-preloader/commit/4ca26f9f51ffb28b025c49c7cee28e5e1f6fc670))



## [8.0.1](https://github.com/dmnsgn/async-preloader/compare/v8.0.0...v8.0.1) (2023-02-09)



# [8.0.0](https://github.com/dmnsgn/async-preloader/compare/v7.0.0...v8.0.0) (2022-10-25)


### Bug Fixes

* check for unsupported features in nodes ([5ad3ae6](https://github.com/dmnsgn/async-preloader/commit/5ad3ae6e2c7e613f4c2be6d6d6a6830ec92801b2))
* reject with error event in loadAudio/Video ([5735f9a](https://github.com/dmnsgn/async-preloader/commit/5735f9a6bf040308bbc436a828e5f39d1aa30fa0))


### Features

* add noDecode ([7394e0d](https://github.com/dmnsgn/async-preloader/commit/7394e0d200a546d1c480866c3d8d5a711d5d1d2a))
* allow string for loadItem(s) ([7025c7d](https://github.com/dmnsgn/async-preloader/commit/7025c7d95f885b01c1121e1e8de877b61aa8ca81))
* use HTMLImageElement.decode() ([2388d40](https://github.com/dmnsgn/async-preloader/commit/2388d40d5fd134efab2ea01a67acb1574d91be64)), closes [#89](https://github.com/dmnsgn/async-preloader/issues/89)


### BREAKING CHANGES

* loadImage now decodes the image by default



# [7.0.0](https://github.com/dmnsgn/async-preloader/compare/v6.1.2...v7.0.0) (2022-06-13)


### Bug Fixes

* exclude android and chrome from isSafari regex ([acf8770](https://github.com/dmnsgn/async-preloader/commit/acf87707d3a6cbb099b990b88a1bb4de42d7c4d6))


### BREAKING CHANGES

* changes audio and video loading in Chrome



## [6.1.2](https://github.com/dmnsgn/async-preloader/compare/v6.1.1...v6.1.2) (2022-04-02)



## [6.1.1](https://github.com/dmnsgn/async-preloader/compare/v6.1.0...v6.1.1) (2022-01-14)



# [6.1.0](https://github.com/dmnsgn/async-preloader/compare/v6.0.0...v6.1.0) (2022-01-14)


### Features

* compute font name from src if no id is present ([6703830](https://github.com/dmnsgn/async-preloader/commit/6703830085a40a360e5ce6539614d2361c1c38ec))



# [6.0.0](https://github.com/dmnsgn/async-preloader/compare/v5.2.1...v6.0.0) (2021-12-04)


### Bug Fixes

* enhance node support by checking for navigator and DOMParser ([9e4f6c5](https://github.com/dmnsgn/async-preloader/commit/9e4f6c555ea82950d446f4db0146c0ffe99db9c4))
* handle falsy path in getFileExtension ([aadd369](https://github.com/dmnsgn/async-preloader/commit/aadd36949ce2fbec3fa2aa23b782be35e17ad672))
* update returned types for loaders ([fe46654](https://github.com/dmnsgn/async-preloader/commit/fe4665488645f1b3708afaeaf7dfc13d0d416f5c))


### Features

* add support for FontFace ([3830dd7](https://github.com/dmnsgn/async-preloader/commit/3830dd78a0231e3fc87e452036403f27bf2509e8)), closes [#79](https://github.com/dmnsgn/async-preloader/issues/79)


### BREAKING CHANGES

* new behaviour for loadFont



## [5.2.1](https://github.com/dmnsgn/async-preloader/compare/v5.2.0...v5.2.1) (2021-11-12)



# [5.2.0](https://github.com/dmnsgn/async-preloader/compare/v5.1.0...v5.2.0) (2021-10-29)


### Features

* update dependencies and ts-jest ([6a452ff](https://github.com/dmnsgn/async-preloader/commit/6a452ffd35f11e5085d4b3945c180b81fb933815))



# [5.1.0](https://github.com/dmnsgn/async-preloader/compare/v5.0.2...v5.1.0) (2021-10-02)


### Features

* add exports field to package.json ([f9689de](https://github.com/dmnsgn/async-preloader/commit/f9689de1dada6c2b0140a1e5821c4eb869ee47d8))



## [5.0.2](https://github.com/dmnsgn/async-preloader/compare/v5.0.1...v5.0.2) (2021-03-24)



## [5.0.1](https://github.com/dmnsgn/async-preloader/compare/v5.0.0...v5.0.1) (2021-03-20)


### Bug Fixes

* update npmignore ([b0d8e64](https://github.com/dmnsgn/async-preloader/commit/b0d8e64d4c4de183c9e61f78feab21731cd8f1e0))



# [5.0.0](https://github.com/dmnsgn/async-preloader/compare/v4.9.2...v5.0.0) (2021-03-20)


### Code Refactoring

* use ES modules ([c171d01](https://github.com/dmnsgn/async-preloader/commit/c171d0178f27b5e04fff7ea02260517b062e9e24))


### BREAKING CHANGES

* remove cjs/umd
