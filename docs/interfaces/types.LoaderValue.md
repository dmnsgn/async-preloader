[async-preloader](../README.md) / [Modules](../modules.md) / [types](../modules/types.md) / LoaderValue

# Interface: LoaderValue

[types](../modules/types.md).LoaderValue

Values used for the [AsyncPreloader.loaders](../classes/index.AsyncPreloader.md#loaders)

## Table of contents

### Properties

- [defaultMimeType](types.LoaderValue.md#defaultmimetype)
- [extensions](types.LoaderValue.md#extensions)
- [mimeType](types.LoaderValue.md#mimetype)

## Properties

### defaultMimeType

• `Optional` **defaultMimeType**: `DOMParserSupportedType`

Optional defaultMimeType used to handle the Response.

Note: Only used to parse the document in the Xml Loader.

#### Defined in

[types.ts:129](https://github.com/dmnsgn/async-preloader/blob/ec8b4a0/src/types.ts#L129)

___

### extensions

• **extensions**: `string`[]

[LoadItem](types.LoadItem.md) with no loader key specified will use the following array to find which loader should be used.

#### Defined in

[types.ts:117](https://github.com/dmnsgn/async-preloader/blob/ec8b4a0/src/types.ts#L117)

___

### mimeType

• `Optional` **mimeType**: `Object`

Optional mimeType used to handle the Response.

Note: Only used to parse the document in the Xml Loader.

#### Index signature

▪ [key: `string`]: `DOMParserSupportedType`

#### Defined in

[types.ts:123](https://github.com/dmnsgn/async-preloader/blob/ec8b4a0/src/types.ts#L123)
