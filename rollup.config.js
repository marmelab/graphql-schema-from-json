const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');
const json = require('rollup-plugin-json');

export default {
    input: './src/index.js',
    output: {
        file: 'lib/index.js',
        format: 'umd',
        name: 'json-to-grapgql',
        exports: 'named',
    },
    plugins: [
        resolve({
            jsnext: true,
            browser: true,
        }),
        commonjs({
            include: 'node_modules/**',
            exclude: 'node_modules/rollup-plugin-node-builtins/**',
            namedExports: {
                'node_modules/graphql/index.js': [
                    'parse',
                    'graphql',
                    'extendSchema',
                    'GraphQLBoolean',
                    'GraphQLError',
                    'GraphQLFloat',
                    'GraphQLID',
                    'GraphQLInputObjectType',
                    'GraphQLInt',
                    'GraphQLList',
                    'GraphQLNonNull',
                    'GraphQLObjectType',
                    'GraphQLScalarType',
                    'GraphQLSchema',
                    'GraphQLString',
                ],
                'node_modules/inflection/lib/inflection.js': [
                    'camelize',
                    'pluralize',
                    'singularize',
                    'underscore',
                ],
            },
        }),
        builtins(),
        globals(),
        json(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**', // only transpile our source code
        }),
    ],
};
