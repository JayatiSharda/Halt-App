import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const EmotionChart = ({ data, emotion }) => {
  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FCFCFC',
    color: () => '#bababa',
    strokeWidth: 1, // Adjust the line width as needed
    decimalPlaces: 0, 
  };

  if(data!== undefined && data!==null){
  return (
    <View>
        <LineChart
        data={{
            labels: data?.map((item) => item?.monthName),
            datasets: [
            {
                data: data?.map((item) => item?.Mild),
                color: () => 'green',
            },
            {
                data: data?.map((item) => item?.Moderate),
                color: () => 'red',
            },
            {
                data: data?.map((item) => item?.Severe),
                color: () => 'orange',
            },
            {
                data: data?.map((item) => item?.Good),
                color: () => 'yellow',
            },
            {
                data: data?.map((item) => item?.Relaxed),
                color: () => 'purple',
            },
            {
                data: data?.map((item) => item?.Happy),
                color: () => 'blue',
            },
            ],
        }}
        width={Dimensions.get('window').width - 40} // Adjust width as needed
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
            paddingRight: 22,
            paddingTop: 20
        }}
        segments={2}
        />
        <Text style={styles.graphSubHeader}>x - axis: Name of the Months</Text>
        <Text style={styles.graphSubHeader}>y - axis: Click frequency for this emotion</Text>
        <Text style={styles.graphSubHeaderText}>Index for emotions <Text style={{color: "#7871FC"}}>before</Text> the activities</Text>
        <View style={{flexDirection: "row", alignItems: "center" , justifyContent: "space-between", paddingRight: 45}}>
            <View style={{marginLeft: 15, flexDirection: "row", alignItems: "center", justifyContent: "left"}}><View style={{width: 12, height: 12, borderRadius: 6, backgroundColor: "green", marginRight: 5}}></View><Text style={styles.graphSubHeader}>{"Mild"}</Text></View>

            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "left"}}><View style={{width: 12, height: 12, borderRadius: 6, backgroundColor: "orange", marginRight: 5}}></View><Text style={styles.graphSubHeader}>{"Moderate"}</Text></View>

            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "left"}}><View style={{width: 12, height: 12, borderRadius: 6, backgroundColor: "red", marginRight: 5}}></View><Text style={styles.graphSubHeader}>{"Severe"}</Text></View>
        </View>
        <Text style={styles.graphSubHeaderText}>Index for emotions <Text style={{color: "#7871FC"}}>after</Text> the activities</Text>
        <View style={{flexDirection: "row", alignItems: "center" , justifyContent: "space-between", paddingRight: 45}}>
            <View style={{marginLeft: 15, flexDirection: "row", alignItems: "center", justifyContent: "left"}}><View style={{width: 12, height: 12, borderRadius: 6, backgroundColor: "yellow", marginRight: 5}}></View><Text style={styles.graphSubHeader}>{"Good"}</Text></View>

            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "left"}}><View style={{width: 12, height: 12, borderRadius: 6, backgroundColor: "purple", marginRight: 5}}></View><Text style={styles.graphSubHeader}>{"Relaxed"}</Text></View>
            
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "left"}}><View style={{width: 12, height: 12, borderRadius: 6, backgroundColor: "blue", marginRight: 5,}}></View><Text style={styles.graphSubHeader}>{"Happy"}</Text></View>
        </View>
    </View>
  )}
  else{
    return(
        <Text style={{color: "#fff", padding: 20}}>No Data to display</Text>
    )
  }
};

const styles= StyleSheet.create({
    graphHeader: {
        color: "#fff",
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'Poppins_400Regular',
    },
    graphSubHeader: {
        color: "#fff",
        fontSize: 12,
        marginTop: 5,
        fontFamily: 'Poppins_400Regular',
    },
    graphSubHeaderText: {
        color: "#C59F1A",
        marginTop: 10,
        fontFamily: 'Poppins_400Regular',
    }
})

export default EmotionChart;

