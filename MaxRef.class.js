module.exports = class MaxRef {
    constructor() {
        this.objectName = null;
        this.digest = null;
        this.description = null;
        this.metadata = null;
        this.inlets = null;
        this.outlets = null;
        this.arguments = null;
        this.messages = null;
        this.attributes = null;
    }

    createObjectName(name) {
        this.objectName = `<c74object name=\"${escape(name)}\">`;
    }

    createDigest(digest) {
        this.digest = `<digest>${escape(digest)}</digest>`;
    }

    createDescription(description) {
        this.description = `<description>${escape(description)}</description>`;
    }

    createMetadata(metadata) {
        if (typeof metadata !== 'object') return;
        this.metadata = '<!--METADATA-->\n<metadatalist>';

        for (var data in metadata) {
            this.metadata += `\n\t<metadata name=\"${escape(metadata[data]['name'])}\">${escape(metadata[data]['content'])}</metadata>`;
        }

        this.metadata += '\n<metadatalist>';
    }

    createInlets(inlets) {
        if (typeof inlets !== 'object') return;
        this.inlets = `<!--INLETS-->\n<inletlist>`;

        for (var inlet in inlets) {
            this.inlets += `\n\t<inlet id=\"${escape(inlet)}\" type=\"${escape(inlets[inlet]['type'])}\">`;

            if ('digest' in inlets[inlet]) {
                this.inlets += `\n\t\t<digest>${escape(inlets[inlet]['digest'])}</digest>`;
            }

            if ('description' in inlets[inlet]) {
                this.inlets += `\n\t\t<description>${escape(inlets[inlet]['description'])}</description>`;
            }

            this.inlets += '\n\t</inlet>';
        }

        this.inlets += '\n</inletlist>';
    }

    createOutlets(outlets) {
        if (typeof outlets !== 'object') return;
        this.outlets = '<!--OUTLETS-->\n<outletlist>';

        for (var outlet in outlets) {
            this.outlets += `\n\t<outlet id=\"${escape(outlet)}\" type=\"${escape(outlets[outlet]['type'])}\">`;

            if ('digest' in outlets[outlet]) {
                this.outlets += `\n\t\t<digest>${escape(outlets[outlet]['digest'])}</digest>`;
            }

            if ('description' in outlets[outlet]) {
                this.outlets += `\n\t\t<description>${escape(outlets[outlet]['description'])}</description>`;
            }

            this.outlets += '\n\t</outlet>';
        }

        this.outlets += '\n</outletlist>';
    }

    createArguments(args) {
        if (typeof args !== 'object') return;
        this.arguments = '<!--ARGUMENTS-->\n<objarglist>';

        for (var arg in args) {
            var optionalFlag = 0;
            var optionalArg = escape(args[arg]['optional']);

            if (optionalArg) optionalFlag = optionalArg === 'on' ? 1 : 0;

            this.arguments += `\n\t<objarg name=\"${escape(args[arg]['name'])}\" optional=\"${optionalFlag}\" type=\"${escape(args[arg]['type'])}\">`;

            if ('digest' in args[arg]) {
                this.arguments += `\n\t\t<digest>${escape(args[arg]['digest'])}</digest>`;
            }

            this.arguments += '\n\t</objarg>';
        }

        this.arguments += '\n</objarglist>';
    }

    createMessages(messages) {
        if (typeof messages !== 'object') return;
        this.messages = '<!--MESSAGES-->\n<methodlist>';

        for (var message in messages) {
            this.messages += `\n\t<method name=\"${escape(messages[message]['name'])}\">`;

            if ('args' in messages[message]) {
                this.messages += '\n\t\t<arglist>';

                for (var arg in messages[message]['args']) {
                    var optionalFlag = 0;
                    var optionalArg = escape(messages[message]['args'][arg]['optional']);

                    if (optionalArg) optionalFlag = optionalArg === 'on' ? 1 : 0;

                    this.messages += `\n\t\t\t<arg name=\"${escape(messages[message]['args'][arg]['name'])}\" optional=\"${optionalFlag}\" type=\"${escape(messages[message]['args'][arg]['type'])}\" />`;
                }

                this.messages += '\n\t\t</arglist>';
            }

            if ('digest' in messages[message]) {
                this.messages += `\n\t\t<digest>${escape(messages[message]['digest'])}</digest>`;
            }

            if ('description' in messages[message]) {
                this.messages += `\n\t\t<description>${escape(messages[message]['description'])}</description>`;
            }

            this.messages += '\n\t</method>';
        }

        this.messages += '\n</methodlist>';
    }

    createAttributes(attributes) {
        if (typeof attributes !== 'object') return;
        this.attributes = '<!--ATTRIBUTES-->\n<attributelist>';

        for (var attribute in attributes) {
            var attrGetFlag = 0;
            var attrSetFlag = 0;

            const attrGetArg = escape(attributes[attribute]['get']);
            const attrSetArg = escape(attributes[attribute]['set']);

            if (attrGetArg) attrGetFlag = attrGetArg === 'on' ? 1 : 0;
            if (attrSetArg) attrSetFlag = attrSetArg === 'on' ? 1 : 0;

            this.attributes += `\n\t<attribute name=\"${escape(attributes[attribute]['name'])}\" get=\"${attrGetFlag}\" set=\"${attrSetFlag}\" type=\"${escape(attributes[attribute]['type'])}\" size=\"${attributes[attribute]['size']}\" >`;

            if ('digest' in attributes[attribute]) {
                this.attributes += `\n\t\t<digest>${escape(attributes[attribute]['digest'])}</digest>`;
            }

            if ('description' in attributes[attribute]) {
                this.attributes += `\n\t\t<description>${escape(attributes[attribute]['description'])}</description>`;
            }

            this.attributes += '\n\t</attribute>';
        }

        this.attributes += '\n</attributelist>';
    }

    createXML() {
        var res = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<?xml-stylesheet href="./c74ref.xsl" type="text/xsl"?>';

        res += this.objectName == null ? '' : `\n${this.objectName}`;
        res += this.digest == null ? '' : `\n${this.digest}`;
        res += this.description == null ? '' : `\n${this.description}`;
        res += this.metadata == null ? '' : `\n${this.metadata}`;
        res += this.inlets == null ? '' : `\n${this.inlets}`;
        res += this.outlets == null ? '' : `\n${this.outlets}`;
        res += this.arguments == null ? '' : `\n${this.arguments}`;
        res += this.messages == null ? '' : `\n${this.messages}`;
        res += this.attributes == null ? '' : `\n${this.attributes}`;
        res += '\n</c74object>\n';

        return res;
    }
}


function escape(string) {
    if (typeof string == "string") {
        return string.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
}