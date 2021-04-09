var scanner = require('i18next-scanner');
var vfs = require('vinyl-fs');
var fs = require('fs');

var customTransform = function _transform(file, enc, done) {
    var parser = this.parser;
    console.log(file.path);
    var content = fs.readFileSync(file.path, enc);
    parser.parseFuncFromString(content, (key) => {
        console.log(key);

        var defaultValue = '__TRANSLATION__'; // optional default value
        scanner.Parser.set(key, defaultValue);
    });
    done();
};
const options = {
    debug: false,
    sort: false,
    func: {
        list: ['t'],
        extensions: ['.js']
    },
    lngs: ['en', 'es', 'zh'],
    ns: ['translations'],
    defaultNs: 'translations',
    defaultValue: '',
    resource: {
        loadPath: 'src/locales/{{lng}}/{{ns}}.json',
        savePath: 'src/locales/{{lng}}/{{ns}}.json',
    },
    nsSeparator: ':',
    keySeparator: '.',
    interpolation: {
        pefix: '{{',
        suffix: '}}'
    }
};

vfs.src(['src/*.js', 'src/*/*.js'])
    .pipe(scanner(options))
    .pipe(vfs.dest('.'));