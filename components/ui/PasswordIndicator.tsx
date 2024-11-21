import {useTheme} from "@react-navigation/native";
import React, {useEffect, useMemo} from "react";
import {StyleSheet, Text, View, ViewStyle, TextStyle} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

// Define the type for the PasswordStrengthIndicator props
interface PasswordStrengthIndicatorProps {
  password: string;
  setPasswordStatus: (status: boolean) => void;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  setPasswordStatus,
}) => {
  // Define the password criteria
  const passwordCriteria = [
    {test: (pw: string) => pw.length >= 8, label: "Minimum of 8 characters"},
    {test: (pw: string) => /[A-Z]/.test(pw), label: "At least 1 uppercase"},
    {test: (pw: string) => /\d/.test(pw), label: "At least 1 number"},
    {test: (pw: string) => /[a-z]/.test(pw), label: "At least 1 lowercase"},
    // { test: (pw: string) => /[^A-Za-z0-9]/.test(pw), label: 'At least 1 special character' },
  ];

  // Evaluate the criteria only once per render to optimize performance
  const evaluatedCriteria = useMemo(
    () => passwordCriteria.map((criteria) => criteria.test(password)),
    [password]
  );

  useEffect(() => {
    const allCriteriaMet = evaluatedCriteria.every((met) => met);
    setPasswordStatus(allCriteriaMet);
  }, [evaluatedCriteria, setPasswordStatus]);

  return (
    <View style={styles.container}>
      {passwordCriteria.map((criteria, index) => {
        const isMet = evaluatedCriteria[index];
        return (
          <View
            key={index}
            style={[
              styles.criteriaRow,
              {
                backgroundColor:
                  password && !isMet ? "pink" : isMet ? "#022745" : "white",
              },
            ]}
          >
            <View
              style={[
                styles.iconWrap,
                {
                  borderColor: isMet
                    ? "white"
                    : password && !isMet
                    ? "#FF3737"
                    : "grey",
                  padding: 1,
                },
              ]}
            >
              <AntDesign
                name="checkcircleo"
                size={10}
                color={
                  isMet ? "white" : password && !isMet ? "#FF3737" : "grey"
                }
              />
            </View>
            <Text
              style={[
                styles.criteriaText,
                {
                  color: isMet ? "white" : password && !isMet ? "red" : "grey",
                },
              ]}
            >
              {criteria.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 15,
    marginTop: 5,
  },
  criteriaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4.5,
    marginRight: 12,
  },
  criteriaText: {
    marginLeft: 4,
    lineHeight: 15,
    fontSize: 10,
  },
  iconWrap: {
    borderWidth: 1,
    borderRadius: 50,
  },
});

export default PasswordStrengthIndicator;
