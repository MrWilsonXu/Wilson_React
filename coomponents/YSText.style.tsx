import React from "react";

import { 
    StyleSheet,
    Dimensions
 } from "react-native";

export default StyleSheet.create ({
    titleLayout: {
        fontSize: 24,
        textAlign: 'center', //textAlign: enum('auto', 'left', 'right', 'center', 'justify')
    },
    subTitleLayout: {
        marginLeft: 15,
        top: 10,
        fontSize: 14,
        textAlign: 'left'
    },
    btnContainerViewLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 15,
        marginLeft: 15,
        marginRight: 15
    },
    superLayout: {
        position: 'relative', //默认布局为relative
        marginTop: 15,
        width: Dimensions.get('window').width,
        height: 300,
        backgroundColor: '#FCF7D7'
    }

    /**布局方式 */
    /**
     * flexDirection   决定布局方向         row（水平方向） row-reverse（水平方向反向排列） column（垂直排列） column-reverse（垂直反向排列）
     * flexWrap        决定轴线换行方式      nowrap（不换行） wrap（换行）wrap-reverse（换行，第一行在下方）
     * flexFlow        flex-direction属性和flex-wrap属性的简写形式，默认值 row || nowrap
     * justifyContent  决定主轴（横向轴）上的对齐方式   flex-start（左对齐） flex-end（右对齐） center（中间对齐） space-between（两边对齐父类view，item间隔相等） space-around（item两侧间隔相等）
     * alignItems      决定交叉轴（纵向轴）对齐方式     flex-start（左对齐） flex-end（右对齐） center（中间对齐） baseline（项目的第一行文字的基线对齐） stretch（默认值，若未设置高度为auto，则占满整个容器）
     * alignContent    决定多根轴线的对齐方式          flex-start（交叉轴起点对齐） flex-end（交叉轴终点对齐） center（交叉轴中点对齐） space-between（交叉轴两端对齐，轴线之间的间隔平均分布） space-around（轴线两侧的间隔都相） stretch（轴线占满整个交叉轴）
     */

})