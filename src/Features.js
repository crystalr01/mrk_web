import React from 'react';
// आयकॉन्ससाठी 'lucide-react' लायब्ररी वापरावी.
// तुम्ही 'npm install lucide-react' किंवा 'yarn add lucide-react' ने इन्स्टॉल करू शकता.
import { MessageCircle, Users, BarChart3, Globe, Image, Zap, Download } from 'lucide-react';

// टीप: हा कॉम्पोनेंट वापरण्यासाठी तुमच्या प्रोजेक्टमध्ये Bootstrap CSS लिंक केलेले असणे आवश्यक आहे.
// तुम्ही तुमच्या public/index.html फाईलमध्ये खालील लिंक टाकू शकता:
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

// प्रत्येक फिचरसाठी एक स्वतंत्र कार्ड कॉम्पोनेंट
const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
            <div className="card w-100 shadow-sm border-0 rounded-4 feature-card">
                <div className="card-body p-4 p-lg-5 text-center d-flex flex-column">
                    <div className="feature-icon text-white rounded-3 mb-4 mx-auto">
                        {icon}
                    </div>
                    <h5 className="card-title fw-bold mb-3">{title}</h5>
                    <p className="card-text text-muted flex-grow-1">{description}</p>
                </div>
            </div>
        </div>
    );
};

// मुख्य फिचर्स कॉम्पोनेंट
export default function Features() {
    // तुमच्या ॲपची वैशिष्ट्ये (features)
    const appFeatures = [
        {
            icon: <MessageCircle size={36} />,
            title: "ऑटोमॅटिक WhatsApp/SMS",
            description: "प्रत्येक कॉल नंतर ग्राहकांना तुमच्या व्यवसायाचा आकर्षक मेसेज आपोआप पाठवा. येणाऱ्या, जाणाऱ्या किंवा चुकलेल्या कॉलसाठी वेगवेगळे मेसेज सेट करा."
        },
        {
            icon: <Users size={36} />,
            title: "स्मार्ट लीड मॅनेजमेंट",
            description: "प्रत्येक अनोळखी कॉल नंतर एक पॉप-अप मिळवा आणि एका क्लिकवर नवीन ग्राहकांची माहिती (लीड) जतन करा. आता एकही ग्राहक सुटणार नाही!"
        },
        {
            icon: <BarChart3 size={36} />,
            title: "शक्तिशाली कॉल ॲनालायझर",
            description: "तुमच्या व्यवसायाच्या कॉल्सचे संपूर्ण विश्लेषण मिळवा - किती कॉल्स आले, गेले, चुकले, सर्वात जास्त वेळ बोलणे आणि बरेच काही."
        },
        {
            icon: <Globe size={36} />,
            title: "मोफत वेबसाईट बिल्डर",
            description: "तुमच्या व्यवसायाची माहिती भरा आणि काही क्षणांत एक व्यावसायिक वेबसाईट मोफत तयार करा. तुमच्या व्यवसायाला द्या एक नवी ओळख!"
        },
        {
            icon: <Image size={36} />,
            title: "डेली ऑटो बॅनर जनरेटर",
            description: "तुमच्या व्यवसायासाठी दररोज नवीन आणि आकर्षक जाहिरात बॅनर मिळवा आणि ते WhatsApp व इतर सोशल मीडियावर सहज शेअर करा."
        },
        {
            icon: <Zap size={36} />,
            title: "स्टेटस बूस्टर",
            description: "एक खास फिचर, ज्यामुळे तुमच्या फोनमध्ये सेव्ह नसलेल्या लोकांनाही तुमचा WhatsApp स्टेटस दिसेल आणि तुमची जाहिरात अधिक लोकांपर्यंत पोहोचेल."
        }
    ];

    return (
        <>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

          body {
            font-family: 'Poppins', sans-serif;
          }

          .features-section {
            padding: 6rem 0;
            background-color: #f9faff;
            font-family: 'Poppins', sans-serif;
          }
          .section-title {
            font-size: 2.8rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 1rem;
          }
          .section-subtitle {
            font-size: 1.2rem;
            color: #7f8c9b;
            max-width: 600px;
            margin: 0 auto;
          }
          .feature-icon {
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
          }
          .feature-card {
            background-color: #ffffff;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid #e9ecef;
          }
          .feature-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 1.5rem 4rem rgba(34, 47, 62, 0.1) !important;
          }
          .feature-card:hover .feature-icon {
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
          }
          
          .cta-section {
            padding: 5rem 0;
            background: linear-gradient(135deg, #3f2b96 0%, #a8c0ff 100%);
            color: white;
            font-family: 'Poppins', sans-serif;
          }
          .cta-title {
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
          }
          .cta-subtitle {
            font-weight: 300;
          }
          .cta-btn {
            background-color: #ffffff;
            color: #3f2b96;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            border: none;
            animation: pulse 2s infinite;
          }
          .cta-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            background-color: #f0f0f0;
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 8px 30px rgba(255, 255, 255, 0.3);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
          }
        `}
            </style>

            <div className="features-section">
                <div className="container">
                    <div className="text-center mb-5 pb-4">
                        <h2 className="section-title">तुमच्या व्यवसायाला बनवा 'ऑटोमॅटिक'</h2>
                        <p className="lead section-subtitle">
                            जाहिरातीवरचा खर्च थांबवा! 'मार्केटिंग प्रो' ॲपसोबत तुमचा व्यवसाय पूर्णपणे मोफत वाढवा.
                        </p>
                    </div>

                    <div className="row justify-content-center">
                        {appFeatures.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="cta-section text-center">
                <div className="container">
                    <h3 className="display-4 cta-title mb-3">मग आता वाट कसली पाहताय?</h3>
                    <p className="lead cta-subtitle mb-4">
                        आजच 'मार्केटिंग प्रो' ॲप डाउनलोड करा आणि तुमचा व्यवसाय नव्या उंचीवर घेऊन जा!
                    </p>
                    <button className="btn btn-lg fw-bold px-5 py-3 rounded-pill cta-btn">
                        <Download className="me-2" />
                        ॲप डाउनलोड करा
                    </button>
                </div>
            </div>
        </>
    );
}
