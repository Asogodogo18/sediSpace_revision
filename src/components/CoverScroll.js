import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'

export default function CoverScroll() {
    const [viewHeight, setHeight] = useState(null)
    return (
        <View style={styles.container} onLayout={e => setHeight(e.nativeEvent.layout.height)}>
            {viewHeight && (
                <FlatList
                    data={data}
                    pagingEnabled
                    keyExtractor={(item) => item}
                    decelerationRate='fast'
                    renderItem={({ item }) => (
                        <View style={[styles.item, { height: viewHeight }]}>
                            <Image style={styles.img} source={{ uri: item }} />
                        </View>
                    )}
                />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#444'
    },
    img: {
        height: '100%',
        width: '100%'
    }
})

const data = [
    'https://i.pinimg.com/originals/22/f8/53/22f8531a8b2f8c6c93332a9c5fc86813.png',
    'https://i.pinimg.com/originals/5c/09/c4/5c09c4dc82dc441dfb26975fe8dc1634.jpg',
    'https://i.pinimg.com/originals/65/95/85/6595856323f822a5e9b6411c5d415b49.jpg',
    'https://i.pinimg.com/originals/53/47/4b/53474ba60273be87a64251acd015e8f6.jpg',
    'https://i.pinimg.com/originals/ff/16/87/ff16875a48c5431383ed8d7bfd60da6c.jpg',
    'https://i.pinimg.com/236x/58/bc/85/58bc85159e011822879bcfe2803a01f3--face-photography-tumblr-photography.jpg',
    'https://mediaslide-europe.storage.googleapis.com/asmanagement/pictures/43/1727/profile-1614265695-25fb66df6128f178a224e1ed4dd96da8.jpg',
    'https://i.pinimg.com/originals/e0/9e/0f/e09e0f1c8067e71b1c7544ac746acf1d.jpg',
    'https://i.pinimg.com/originals/2d/38/02/2d3802a4f7e43758298cb6e36e8c0e29.jpg',
    'https://i.pinimg.com/originals/66/89/d9/6689d9b55b2b5e47eb3d323a6ddb5fdc.jpg',
    'https://1.bp.blogspot.com/-dBeI8CPKio0/UtGvMi8ASOI/AAAAAAAAPog/5if981KI14Q/s1600/Sean+O+Pry+01.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/blog-ph/wp-content/uploads/2017/01/24063957/740full-amanda-seyfried.jpg',
    'https://i.pinimg.com/originals/36/1c/12/361c1239557deff386b380d787bcae86.jpg',
    'https://i.pinimg.com/564x/c0/5f/a4/c05fa4970fc4bc93d634c014ebe17692.jpg',
]

