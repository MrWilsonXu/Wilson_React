import React from 'react';

import { 
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    scrollView: {
        backgroundColor: 'black',
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: 'white',
    },
    sectionContainer: {
        marginTop: 5,
        marginLeft: 15,
        paddingHorizontal: 24,
    },
    largeTitle: {
        marginTop: 5,
        marginLeft: 15,
        fontSize: 24
    },
    mediumTitle: {
        fontSize: 16,
        marginLeft: 15,
        fontWeight: '600',
        color: 'red',
    },
    smallTitle: {
        marginTop: 5,
        marginLeft: 15,
        fontSize: 12,
        fontWeight: '400',
        color: '#FF9000',
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: '#C8C8C8',
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    }
})