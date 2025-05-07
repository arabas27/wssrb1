import {
  Document,
  Font,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Buffer } from "buffer";

// @ts-ignore
window.Buffer = Buffer;

// fonts register
Font.register({
  family: "TSN",
  fonts: [
    {
      src: "/app/assets/fonts/THSarabunNew/THSarabunNew.ttf",
      fontWeight: "normal",
    },
    {
      src: "/app/assets/fonts/THSarabunNew/THSarabunNew Bold.ttf",
      fontWeight: 1000,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "1.5cm 2cm 2cm 3cm",
    fontFamily: "TSN",
  },
  // logo, header
  sectionHeader: {
    flexDirection: "row",
  },
  textHeader: {
    fontWeight: "bold",
    paddingLeft: "4.3cm",
    width: "100%",
    marginTop: "0.5cm",
    fontSize: "29pt",
  },
  logoImage: {
    height: "1.5cm",
    width: "1.6cm",
  },
  // header details
  sectionHeaderDetails: {
    flexDirection: "column",
  },
  hdDetailInlineGroup: {
    flexDirection: "row",
  },
  hdDetailInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: "12pt",
    width: "50%",
    marginTop: -4,
  },
  hdDetailInlineAdd: {
    flexDirection: "row",
    alignItems: "center",
    gap: "12pt",
    width: "50%",
  },
  hdDetailHeader: {
    fontSize: "20pt",
    fontWeight: "bold",
  },
  hdDetailText: {
    fontSize: "16pt",
  },

  // body
  body: {
    marginTop: 8,
  },
  bodyText: {
    textIndent: 70.8,
    fontSize: "16pt",
  },

  // 4 space
  fourBlankLines: {
    height: 96,
  },

  // signature
  signatureGroup: {
    flexDirection: "row",
  },
  blankGroup: {
    width: "35%",
  },
  mainGroup: {
    width: "100%",
    textAlign: "center",
  },
});

type TProps = {
  sector: string;
  bookNo: string;
  date: string;
  title: string;
  toWhom: string;
  body: string[];
  author: string;
  authorPosition: string;
};

const PreviewDocument = (props: TProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionHeader}>
        <Image src="/app/assets/img/garuda.png" style={styles.logoImage} />
        <Text style={styles.textHeader}>บันทึกข้อความ</Text>
      </View>
      <View style={styles.sectionHeaderDetails}>
        {/* ส่วนราชการ */}
        <View style={styles.hdDetailInline}>
          <Text style={styles.hdDetailHeader}>ส่วนราชการ</Text>
          <Text style={styles.hdDetailText}>{props.sector}</Text>
        </View>

        {/* ที่ */}
        <View style={styles.hdDetailInlineGroup}>
          <View style={styles.hdDetailInline}>
            <Text style={styles.hdDetailHeader}>ที่</Text>
            <Text style={styles.hdDetailText}>{props.bookNo}</Text>
          </View>
          <View style={styles.hdDetailInline}>
            <Text style={styles.hdDetailHeader}>วันที่</Text>
            <Text style={styles.hdDetailText}>{props.date}</Text>
          </View>
        </View>

        {/* เรื่อง */}
        <View style={styles.hdDetailInline}>
          <Text style={styles.hdDetailHeader}>เรื่อง</Text>
          <Text style={styles.hdDetailText}>{props.title}</Text>
        </View>

        {/* เรียน */}
        <View style={styles.hdDetailInlineAdd}>
          <Text style={styles.hdDetailText}>เรียน</Text>
          <Text style={styles.hdDetailText}>{props.toWhom}</Text>
        </View>

        {/* ข้อความ */}
        <View style={styles.body}>
          <Text style={styles.bodyText}>{props.body[0]}</Text>
        </View>
        {/* ข้อความ */}
        <View style={styles.body}>
          <Text style={styles.bodyText}>{props.body[1]}</Text>
        </View>
        {/* ข้อความ */}
        <View style={styles.body}>
          <Text style={styles.bodyText}>{props.body[2]}</Text>
        </View>

        {/* ช่องว่าง 4 บรรทัด */}
        <View style={styles.fourBlankLines}></View>

        {/* ลายเซ็นต์ */}
        <View style={styles.signatureGroup}>
          <View style={styles.blankGroup}></View>
          <View style={styles.mainGroup}>
            <Text>({props.author})</Text>
            <Text>{props.authorPosition}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default function Preview() {
  const data = sessionStorage.getItem("previewData");
  const previewData = JSON.parse(data as string);

  return (
    <PDFViewer className="h-full w-full">
      <PreviewDocument {...previewData} />
    </PDFViewer>
  );
}
