const fs = require('fs');
const path = require('path');

/** SUMMARY:
 * This summary should help someone who stumbles upon this file to understand
 * what and why we're changing.
 *
 * It is an internal Dolby requirement for documentation files to have a specific
 * structure and contents. Quite a lot of things that typedoc library generates
 * from our typescript files unfortunately doesn't match Dolby requirements. This file
 * serves as a documentation-compatibility generator that takes originally created
 * documentation files and convert their contents and their names.
 * Running the script requires original documentation files to be present in root
 * `/docs` directory. Newly created files will appear in /scripts/docs directory.
 *
 *
 * KNOWN REQUIREMENTS as of 11.01.2022
 * 1. Documentation Files need to have a header for SEO and CI/CD purposes - this is
 * done with getHeader() function.
 *
 * 2. Documentation Files need to have their slug generated based on their names. This
 * follows a convention of slugprefix-module-filename e.g.
 * rn-client-sdk-references-videopresentationservice. This is done with getFilePathSlugName()
 * function.
 *
 * 3. Documentation Files need to have their internal links swapped. Originally we have
 * links in a format of [`Conference`](../interfaces/internal.Conference.md) - requirement
 * is to get rid of backticks in [`Conference`] and change link path from ../interfaces/internal.Conference.md
 * to doc:rn-client-sdk-interfaces-conference - full change should look like:
 * [Conference](doc:rn-client-sdk-models-conference) (this is already with module
 * rename from point 4.)
 *
 * 4. Documentation Files need to have their module folder names renamed:
 * interfaces => models
 * classes => references
 * This change also includes changes in link paths inside the files and slug names.
 *
 * 5. Documentation Files need to have their Table of contents removed. Starting with
 * the title and following contents beneath (up until major category title e.g.
 * ## Properties or ## Methods or ## Enumeration members).
 * One exception is CommsAPI file that should also have its Table of contents removed
 * but without ## Properties part.
 *
 * 6. All event handlers should have added `##Event handlers` category. It is important to keep
 * all event handlers as last methods in our SDK code, because we can't reliably find all of them and group them
 * together programmatically.
 */

/**
 * This will match and capture raw documentation filenames (ignoring any prefixes)
 * e.g. it will match `internal.ConferenceService.md` and capture `ConferenceService`
 */
const REGEXP_MATCH_DOC_FILENAME = /(?:.+\/internal\.)?(\w+)\.md/;

/**
 * This will match and capture all documentation links that need to be changed
 * e.g. it will match `[internal](../modules/internal.md)` and capture
 * `../modules/internal.md`
 */
const REGEXP_MATCH_DOC_LINKS = /\[.+?]\((.+?\.md)(?:#.+?)?\)/g;

/**
 * This will match and capture module name after /docs/ e.g. it will match
 * `../docs/interface/Conference.md` and capture `interface`
 */
const REGEXP_MATCH_DOC_MODULE = /docs\/(\w+)\//;

const REGEXP_MATCH_INTERNAL_LINKS = /\[internal].+/g;
const REGEXP_MATCH_CLASS_TITLES = /# Class: \w+/g;
const REGEXP_MATCH_DOC_TITLES = /(# Interface:|# Enumeration:|# Namespace:).+/g;
const REGEXP_MATCH_TABLE_OF_CONTENTS =
  /(## Table of contents[\S\s*]*)(?=## Properties|## Methods|## Enumeration members)/g;

const REGEXP_MATCH_TABLE_OF_CONTENTS_COMMS_FILE =
  /(## Table of contents[\S\s*]*)(?=## Properties)/g;

const REGEXP_MATCH_EVENT_HANDLERS = /(### on[\S\s*]*)/g;
/**
 * This will match and capture all full link descriptions
 * e.g. it will capture `Participant` and Participant from [`Participant`](../interfaces/internal.Participant.md)
 * (we want to replace [`Participant`] for [Participant])
 */
const REGEXP_MATCH_BACKTICKS = /\[(`(\w+)`)?]\(.+?\)/g;

const SLUG_PREFIX = 'rn-client-sdk-';
const LINK_SLUG_PREFIX = 'doc:rn-client-sdk-';

const FILE_PATHS = [];
const DOCS_DIR = '../docs';

const HEADER_DATE = '2022-01-26T00:00:00.000Z';

const IGNORED_FILES = ['modules.md', '.nojekyll', 'README.md'];

/**
 * This function will convert current auto-generated docs to format that is aligned with
 * internal Dolby requirements for distributing documentation on Dolby.io website.
 * It takes DOCS_DIR variable and uses it as an entrypoint for traversing documentation files.
 * After that, it will iterate over each file, create a new slug, insert a header and then write
 * that as a new file to ./scripts/docs directory
 *
 * How to use:
 * Run `node convertDocs.js` in scripts directory. A docs directory in /scripts/docs should be created with all converted files.
 */
(async function () {
  const nodeVersion = process.versions.node.match(/(\d.)\.\d./);
  if (nodeVersion) {
    if (Number(nodeVersion[1]) < 15) {
      throw new Error('Minimum node version needed is v15!');
    }
  } else {
    console.error('Unknown node version... Proceeding anyway.');
  }

  // this is recursive function, it will populate FILE_PATHS constant
  buildFilesPathArray(DOCS_DIR);

  const FILTERED_FILE_PATHS = FILE_PATHS.filter(
    (p) => !IGNORED_FILES.includes(path.basename(p))
  );

  if (!FILTERED_FILE_PATHS.length)
    throw new Error(`No file paths found to work on!`);

  FILTERED_FILE_PATHS.forEach(convertDocFile);

  console.log('Conversion successful!');
})();

function getHeader(title, slug, order) {
  return `---
apiVersion: 1.0
categoryName: React Native SDK
title: ${title}
slug: ${slug}
excerpt: None
category: 60b289fa3ada0c007f41d5a9
order: ${order}
hidden: False
createdAt: ${HEADER_DATE}
updatedAt: ${HEADER_DATE}
metadata:
  title: ${title}
  description: Explore our React Native SDK documentation to create a video conference application.
  image:
    [
      "https://files.readme.io/eaba311-dolbyio-seo-image.jpg",
      "dolbyio-seo-image.jpg",
      2048,
      1072,
      "#120000",
    ]
---\n
`;
}

/**
 * This function gets module name from filepath, e.g. from `../docs/interfaces/Conference.md`
 * it should return `interfaces`
 */
function getFilePathModuleName(filePath) {
  const moduleName = filePath.match(REGEXP_MATCH_DOC_MODULE);
  if (!moduleName) {
    throw new Error(`[${filePath}]: reading file module error `);
  }
  return moduleName[1];
}

/** This function gives us raw file name e.g. from Conference.md it will return Conference */
function getFilePathRawFileName(filePath) {
  const rawFileName = filePath.match(REGEXP_MATCH_DOC_FILENAME);
  if (!rawFileName) {
    throw new Error(`[${filePath}]: reading raw filename error`);
  }
  return rawFileName[1];
}

/**
 * This function creates header slug (format: slug prefix + module + filename in lowercase)
 * e.g. slug for a file `../docs/interfaces/internal.ConferenceMixingOptions.md` should look like
 * `rn-client-sdk-interfaces-conferencemixingoptions`
 */
function getFilePathSlugName(module, rawFilename) {
  return (
    SLUG_PREFIX +
    module +
    (module === 'modules' ? '' : `-${rawFilename.toLowerCase()}`)
  );
}

/** This function returns new file path where converted doc file will be saved */
function getNewFilepath(oldPath, slug) {
  const newFilePath = path.dirname(oldPath).substring(1);
  return newFilePath + `/${slug}.md`;
}

function getFilePathMetadata(filePath) {
  const module = getFilePathModuleName(filePath);
  const rawFilename = getFilePathRawFileName(filePath);
  const slug = getFilePathSlugName(module, rawFilename);
  return [rawFilename, module, slug];
}

function convertDocFile(filePath, index) {
  let renamedFilepath = filePath;

  // we're renaming classes to references and interfaces to models
  if (/classes/.test(renamedFilepath)) {
    renamedFilepath = renamedFilepath.replace(/classes/, 'references');
  } else if (/interfaces/.test(renamedFilepath)) {
    renamedFilepath = renamedFilepath.replace(/interfaces/, 'models');
  }

  // we get all necessary metadata and header
  const [rawFilename, module, slug] = getFilePathMetadata(renamedFilepath);
  const header = getHeader(
    rawFilename === 'internal' ? 'modules' : rawFilename,
    slug,
    index
  );

  // we get our new filename
  const newFilePath = getNewFilepath(renamedFilepath, slug);

  // we read the original file
  const fileBuffer = fs.readFileSync(filePath);
  if (!fileBuffer) {
    throw new Error(`[${filePath}]: reading file error`);
  }
  const docAsString = fileBuffer.toString();

  // we add header to the file as string
  const docWithHeader = header + docAsString;

  // we replace all necessary stuff following requirements from top of the page
  let convertedDocAsString = '';
  convertedDocAsString = docWithHeader
    .replaceAll(REGEXP_MATCH_DOC_LINKS, (substring) =>
      changeLinkFormatReplacerFn(substring, module)
    )
    .replaceAll(REGEXP_MATCH_INTERNAL_LINKS, '')
    .replaceAll(REGEXP_MATCH_CLASS_TITLES, '')
    .replaceAll(REGEXP_MATCH_DOC_TITLES, '')
    .replaceAll(REGEXP_MATCH_BACKTICKS, (substring, _, captureGroupTwo) => {
      return substring.replace(/(?<=\[)(`(\w+)`)(?=]\(.+\))/, captureGroupTwo);
    })
    .replaceAll(REGEXP_MATCH_EVENT_HANDLERS, (substring) => {
      return `## Event handlers\n\n${substring}`;
    });

  // if file is CommsAPI we need to introduce custom behaviour
  if (rawFilename === 'CommsAPI') {
    convertedDocAsString = convertedDocAsString.replaceAll(
      REGEXP_MATCH_TABLE_OF_CONTENTS_COMMS_FILE,
      ''
    );
  } else {
    convertedDocAsString = convertedDocAsString.replaceAll(
      REGEXP_MATCH_TABLE_OF_CONTENTS,
      ''
    );
  }

  // we write our newly generated file to disk
  try {
    const newFile = path.dirname(renamedFilepath).substring(1);
    if (!fs.existsSync(newFile)) {
      fs.mkdirSync(newFile, {
        recursive: true,
      });
    }

    fs.writeFileSync(newFilePath, convertedDocAsString);
  } catch (e) {
    console.error(
      `[${newFilePath.substring(
        0,
        newFilePath.length - 3
      )}]: writing or renaming error`
    );
    console.error(e);
  }
}

/**
 * This function traverses pointed dir and adds all paths to global FILE_PATHS variable
 */
function buildFilesPathArray(dir) {
  fs.readdirSync(dir).forEach((fileOrDir) => {
    const fullPath = path.join(dir, fileOrDir);
    if (fs.lstatSync(fullPath).isDirectory()) {
      buildFilesPathArray(fullPath);
    } else {
      FILE_PATHS.push(fullPath);
    }
  });
}

function changeLinkFormatReplacerFn(substring, moduleName) {
  let replaceString;
  // we check if string links to general `internal.md` file
  const isRootInternalModule = new RegExp('internal.md').test(substring);
  if (isRootInternalModule) {
    // if it does, we apply custom prefix: `doc:rn-client-sdk-modules`
    replaceString = LINK_SLUG_PREFIX + 'modules';
    return substring.replace(/(?<=\[.+]\().+\.md(?=(#.+)?\))/, replaceString);
  }

  // we rename internal document names according to requirement no. 4
  // this will match (../models/internal.FileConverted.md) and capture `models`
  const module = substring
    .replace(/interfaces/, 'models')
    .replace(/classes/, 'references')
    .match(/\(\.\.\/(.+)\//);

  // this will match [Recording](../interfaces/internal.Recording.md) and capture
  // `Recording`
  const methodName = substring.match(/internal\.(.+)\.md(#.+)?\)/);

  // links in CommsAPI.md file are the only ones that point to themselves
  // this means we have to apply custom replace behaviour in those cases
  if (!methodName) {
    if (substring.match(REGEXP_MATCH_DOC_FILENAME)[0] === 'CommsAPI.md') {
      const link = substring.match(/#\w+/);
      return substring.replace(/(?<=.+\()(.+)(?=\))/, link[0]);
    }
    console.error('service not found in changeLinkFormatReplaceFn', substring);
    return substring;
  }

  replaceString =
    LINK_SLUG_PREFIX +
    (module ? `${module[1]}-` : `${moduleName}-`) +
    `${methodName[1].toLowerCase()}`;

  return substring.replace(/(?<=\[.+]\().+\.md(?=.+\))?/, replaceString);
}
