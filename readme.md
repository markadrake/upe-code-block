_This repo is a work in progress. The `/App_Plugin/` directory is ready to go and by copying it into your Umbraco (website) project you can create a new data type called `CodeMirror`. Bare with me as I write up some of the why, how-to, etc. [@themarkdrake](https://twitter.com/themarkdrake)._

# Code Block

**Code Block** is a property editor for the [open source Umbraco CMS](https://umbraco.com). It's essentially an Angular 1.1.5 component that reads data from a [CodeMirror text editor](https://codemirror.net/) that's sandboxed inside of an `<iframe>`. It makes use of the `window.postMessage()` browser API, which has wide browser support for same-origin and frame or iframe based messaging.

## What do you need a code editor inside of Umbraco for?

Data types are versatile in Umbraco. You could use this property editor many different ways. Here's a few ideas:

### 1. Create yourself a global website settings document type and content node.

How often do your clients (or you) need to add or manage things within the `<head>` or just before the closing `<body>` tag your website?

Maybe you need custom meta tags added across your site? Need to integrate Google Analytics or another 3rd party tracking code? Maybe you've hired a consultant that needs to add their own code, without opening up your code base to them? During my time with The Scylla Group I've come across each one of these scenarios _almost every single project_.

One solution to this scenario that provides value for everyone involved is a "global web site settings" content node. You can create a document type in Umbraco and identify/provide opportunities for custom code to be injected into your master page. Be sure to give access to more than just the `<head>` of your page, best practices sometimes dictate that you load stuff at the end of your document just before the closing `</body>` tag.

And by no means does this need to be global. Perhaps you have a specific document type and page template you'd like to integrate custom code with?

### 2. Create a document type and use this as a grid editor or stacked content component!

**I'll write this soon I promise!**

### 3. Maybe you want to render code on the front end of your website?

If you run a technical blog, or you're building a web site to accompany a digital product, service, or API you may have the need to show users and customers actual code samples. 

It wouldn't be a stretch to update the front-end rendering template for your grid editor or stacked component to utilize CodeMirror to show off that beautiful code!

## Why CodeMirror over a RTE or just plain `<textarea>`?

If you've tried to copy and paste code into the RTE then you most likely know the answer already - and sure there are settings you can configure to make it better but the fact of the matter is RTEs simply weren't made for throwing in a ton of HTML, CSS, and JS. If you try it today you'll most likely run across problems where the RTE adds or modifies your HTML, removes or comments scripts, and chews up your text formatting.

So why not a plain `<textarea>` element? That definitely works - and it's what we have used for client projects in the past. But while we as developers benefit from fancy editors with syntax highlighting, brace-matching, and other editing conveniences - our content authors in Umbraco do not. Leverage this awesome code editor package and give your content authors to quickly recognize issues in their code as if they are editing from a real IDE.

## Great - so why the `<iframe>`?

_While we may not have needed this architecture,_ I think it's best to sandbox the CodeMirror project into it's own contextual document. 

Encapsulating it this way ensures any JavaScript issues with CodeMirror, its plugins, and any modifications you may add are kept out of the Umbraco Back Office stack. 

CodeMirror also comes with themes and highly relies on CSS to support its syntax highlighting features. Without the proper precautions - it can be very easy to write CSS for a property editor that has unexpected, global, cascading changes that are detrimental to the Umbraco Back Office UI and UX.

## What if I want to upgrade CodeMirror?

The version of CodeMirror this repo includes is 5.39.2 but that doesn't mean you can't upgrade it. Inside of `/App_Plugins/CodeMirror/` you will find a couple of familiar folders:

- addon
- lib
- mode
- plugins
- theme

These folders were simply copied and pasted from the [CodeMirror project at GitHub](https://github.com/codemirror/codemirror). They also host [a downloadable zip file](https://codemirror.net/codemirror.zip) for convenience at their (secure) website [codemirror.net](https://codemirror.net/).

This means upgrading it should be easy. And we didn't need to modify any of CodeMirrors files for this property editor. It should be safe to upgrade these folders anytime they update.