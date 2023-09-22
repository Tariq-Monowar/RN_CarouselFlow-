import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import { data } from "./imageData";

const windowWidth = Dimensions.get("window").width;
const { width, height } = Dimensions.get("screen");

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={"transparent"}
      />
      <View style={[StyleSheet.absoluteFillObject]}>
        {data && data.map((item, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * windowWidth,
              index * windowWidth,
              (index + 1) * windowWidth,
            ],
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={index}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              source={{ uri: item }}
              blurRadius={30}
            ></Animated.Image>
          );
        })}
      </View>

      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View
              style={{ width, justifyContent: "center", alignItems: "center" }}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: "cover",
                  borderRadius: 16,
                }}
              />
            </View>
          );
        }}
        // Set the initial scroll index to the bottom-most item
        initialScrollIndex={data.length - 1}
      />
    </View>
  );
}
