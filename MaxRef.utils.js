module.exports = {
    parseObjectName: function (data) {
        const re = /^object-name/g;

        for (var key in data) {
            const match = re.exec(key);

            if (match) {
                return data[key];
            }
        }
    },

    parseObjectDigest: function (data) {
        const re = /^object-digest/g;

        for (var key in data) {
            const match = re.exec(key);

            if (match) {
                return data[key];
            }
        }
    },

    parseObjectDescription: function (data) {
        const re = /^object-description/g;

        for (var key in data) {
            const match = re.exec(key);

            if (match) {
                return data[key];
            }
        }
    },

    parseInlets: function (data) {
        const re = /^inlet-([\d]+)-(type|digest|description)/;

        var inletsJson = {};

        for (var key in data) {
            const match = re.exec(key)

            if (match) {
                switch (match[2]) {
                    case 'type':
                        if (inletsJson[match[1]]) inletsJson[match[1]]['type'] = data[key];
                        else inletsJson[match[1]] = { 'type': data[key] };
                        break;
                    case 'digest':
                        if (inletsJson[match[1]]) inletsJson[match[1]]['digest'] = data[key];
                        else inletsJson[match[1]] = { 'digest': data[key] };
                        break;
                    case 'description':
                        if (inletsJson[match[1]]) inletsJson[match[1]]['description'] = data[key];
                        else inletsJson[match[1]] = { 'description': data[key] };
                        break;
                }
            }
        }

        if (Object.keys(inletsJson).length !== 0) return inletsJson;
    },

    parseOutlets: function (data) {
        const re = /^outlet-([\d]+)-(type|digest|description)/;

        var outletsJson = {};

        for (var key in data) {
            const match = re.exec(key)

            if (match) {
                switch (match[2]) {
                    case 'type':
                        if (outletsJson[match[1]]) outletsJson[match[1]]['type'] = data[key];
                        else outletsJson[match[1]] = { 'type': data[key] };
                        break;
                    case 'digest':
                        if (outletsJson[match[1]]) outletsJson[match[1]]['digest'] = data[key];
                        else outletsJson[match[1]] = { 'digest': data[key] };
                        break;
                    case 'description':
                        if (outletsJson[match[1]]) outletsJson[match[1]]['description'] = data[key];
                        else outletsJson[match[1]] = { 'description': data[key] };
                        break;
                }
            }
        }

        if (Object.keys(outletsJson).length !== 0) return outletsJson;
    },

    parseArguments: function (data) {
        const re = /^argument-([\d]+)-(name|type|digest|optional)/;

        var argumentsJson = {};

        for (var key in data) {
            const match = re.exec(key);

            if (match) {
                switch (match[2]) {
                    case 'name':
                        if (argumentsJson[match[1]]) argumentsJson[match[1]]['name'] = data[key];
                        else argumentsJson[match[1]] = { 'type': data[key] };
                        break;
                    case 'type':
                        if (argumentsJson[match[1]]) argumentsJson[match[1]]['type'] = data[key];
                        else (argumentsJson[match[1]]) = { 'type': data[key] };
                        break;
                    case 'digest':
                        if (argumentsJson[match[1]]) argumentsJson[match[1]]['digest'] = data[key];
                        else (argumentsJson[match[1]]) = { 'digest': data[key] };
                        break;
                    case 'optional':
                        var optionalFlag = (data[key] == 'on' ? '1' : '0');
                        if (argumentsJson[match[1]]) argumentsJson[match[1]]['optional'] = optionalFlag;
                        else (argumentsJson[match[1]]) = { 'optional': optionalFlag };
                        break;
                }
            }
        }

        if (Object.keys(argumentsJson).length !== 0) return argumentsJson;
    },


    parseMessages: function (data) {
        //? Maybe not necessary to optionally match these, as there may be no other case
        const re = /^message-([\d]+)-(name|digest|description)/g

        var messagesJson = {};

        for (var key in data) {
            const match = re.exec(key);

            if (match) {
                switch (match[2]) {
                    case 'name':
                        if (messagesJson[match[1]]) messagesJson[match[1]]['name'] = data[key];
                        else (messagesJson[match[1]]) = { 'name': data[key] };

                        var parsedArguments = module.exports.parseMessageArguments(match[1], data);
                        if (typeof parsedArguments === 'object') {
                            messagesJson[match[1]]['args'] = parsedArguments;
                        }
                        break;
                    case 'digest':
                        if (messagesJson[match[1]]) messagesJson[match[1]]['digest'] = data[key];
                        else (messagesJson[match[1]]) = { 'digest': data[key] };

                        var parsedArguments = module.exports.parseMessageArguments(match[1], data);
                        if (typeof parsedArguments === 'object') {
                            messagesJson[match[1]]['args'] = parsedArguments;
                        }
                        break;
                    case 'description':
                        if (messagesJson[match[1]]) messagesJson[match[1]]['description'] = data[key];
                        else (messagesJson[match[1]]) = { 'description': data[key] };

                        var parsedArguments = module.exports.parseMessageArguments(match[1], data);
                        if (typeof parsedArguments === 'object') {
                            messagesJson[match[1]]['args'] = parsedArguments;
                        }
                        break;
                }
            }
        }

        if (Object.keys(messagesJson).length !== 0) return messagesJson;
    },

    parseMessageArguments: function (messageId, data) {
        const re = /^message-([\d]+)-argument-([\d]+)-(name|type|optional)/;

        var messageArgumentsJson = {};

        for (var key in data) {
            const match = re.exec(key);

            if (match && match[1] == messageId) {
                switch (match[3]) {
                    case 'name':
                        if (messageArgumentsJson[match[1]]) messageArgumentsJson[match[1]]['name'] = data[key];
                        else (messageArgumentsJson[match[1]]) = { 'name': data[key] };
                        break;
                    case 'type':
                        if (messageArgumentsJson[match[1]]) messageArgumentsJson[match[1]]['type'] = data[key];
                        else (messageArgumentsJson[match[1]]) = { 'type': data[key] };
                        break;
                    case 'optional':
                        var optionalFlag = (data[key] == 'on' ? '1' : '0');
                        if (messageArgumentsJson[match[1]]) messageArgumentsJson[match[1]]['optional'] = optionalFlag;
                        else (messageArgumentsJson[match[1]]) = { 'optional': optionalFlag };
                        break;
                }
            }
        }

        if (Object.keys(messageArgumentsJson).length !== 0) return messageArgumentsJson;
    },

    parseAttributes: function (data) {
        const re = /^attribute-([\d]+)-(name|get|set|type|size|digest|description)/;

        var attributesJson = {};

        for (var key in data) {
            const match = re.exec(key);

            if (match) {
                switch (match[2]) {
                    case 'name':
                        if (attributesJson[match[1]]) attributesJson[match[1]]['name'] = data[key];
                        else (attributesJson[match[1]]) = { 'name': data[key] };
                        break;
                    case 'get':
                        var getFlag = data[key] == 'on' ? '1' : '0';
                        if (attributesJson[match[1]]) attributesJson[match[1]]['get'] = getFlag;
                        else (attributesJson[match[1]]) = { 'get': getFlag };
                        break;
                    case 'set':
                        var setFlag = data[key] == 'on' ? '1' : '0';
                        if (attributesJson[match[1]]) attributesJson[match[1]]['set'] = setFlag;
                        else (attributesJson[match[1]]) = { 'set': setFlag };
                        break;
                    case 'type':
                        if (attributesJson[match[1]]) attributesJson[match[1]]['type'] = data[key];
                        else (attributesJson[match[1]]) = { 'type': data[key] };
                        break;
                    case 'size':
                        if (attributesJson[match[1]]) attributesJson[match[1]]['size'] = data[key];
                        else (attributesJson[match[1]]) = { 'size': data[key] };
                        break;
                    case 'digest':
                        if (attributesJson[match[1]]) attributesJson[match[1]]['digest'] = data[key];
                        else (attributesJson[match[1]]) = { 'digest': data[key] };
                        break;
                    case 'description':
                        if (attributesJson[match[1]]) attributesJson[match[1]]['description'] = data[key];
                        else (attributesJson[match[1]]) = { 'description': data[key] };
                        break;
                }
            }
        }

        if (Object.keys(attributesJson).length !== 0) return attributesJson;
    }
}