import React, { useRef } from 'react';
import { PDFViewer, PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const DepartmentDetails = () => {
  const ref = useRef();

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Department of Computer Science and Engineering</Text>

          <View style={styles.section}>
            <Text style={styles.heading}>Vision</Text>
            <Text style={styles.content}>To empower the students of the Computer Science and Engineering Department to be technologically proficient, socially committed citizens by fostering a conducive learning environment.</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Mission</Text>
            <Text style={styles.content}>
              **M1:** To develop knowledge in both theoretical and applied foundations of Computer Science and Engineering.
              {'\n'}
              **M2:** To establish a learner-centric and career-oriented education system.
              {'\n'}
              **M3:** To provide good quality education for preparing better software professionals.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Programme Specific Outcomes (PSOs)</Text>
            <Text style={styles.content}>
              **PSO1:** The students will be able to identify, formulate, and design solutions for complex engineering problems in technical areas.
              {'\n'}
              **PSO2:** Enable the students to apply the fundamentals of Computer Science in competitive fields and to implement new ideas.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Programme Educational Objectives (PEOs)</Text>
            <Text style={styles.content}>
              **PEO1:** Graduates shall evolve as globally competent Computer engineers for developing innovative solutions in multidisciplinary domains.
              {'\n'}
              **PEO2:** Graduates shall have up-to-date knowledge in Computer Science & Engineering along with broad knowledge of mathematics, science, management, and allied engineering to promote their career.
              {'\n'}
              **PEO3:** Graduates shall nurture team spirit, ethics, social values, communication skills, and leadership, enabling them to become better professionals of tomorrow.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Programme Outcome</Text>
            <Text style={styles.content}>
              **1. Engineering knowledge:** Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.
              {'\n'}
              **2. Problem analysis:** Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.
              {'\n'}
              **3. Design/development of solutions:** Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and cultural, societal, and environmental considerations.
              {'\n'}
              **4. Conduct investigations of complex problems:** Use research-based knowledge and research methods including the design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.
              {'\n'}
              **5. Modern tool usage:** Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of limitations.
              {'\n'}
              **6. The engineer and society:** Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues and the consequent responsibilities relevant to professional engineering practice.
              {'\n'}
              **7. Environment and sustainability:** Understand the impact of professional engineering solutions in societal and environmental contexts and demonstrate knowledge of, and the need for sustainable development.
              {'\n'}
              **8. Ethics:** Apply ethical principles and commit to professional ethics, responsibilities, and norms of engineering practice.
              {'\n'}
              **9. Individual and team work:** Function effectively as an individual and as a member or leader in diverse teams and in multidisciplinary settings.
              {'\n'}
              **10. Communication:** Communicate effectively on complex engineering activities with the engineering community and with society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.
              {'\n'}
              **11. Project management and finance:** Demonstrate knowledge and understanding of engineering and management principles and apply them to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Coordinator: Shinu</Text>
            <Text style={styles.heading}>HOD: Anup</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="bg-blue-100 p-8 text-center w-full">
      <PDFViewer width="100%" height="500px" ref={ref}>
        {MyDocument}
      </PDFViewer>

      <PDFDownloadLink document={MyDocument} fileName="DepartmentDetails.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default DepartmentDetails;
