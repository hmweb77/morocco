"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  FileText,
  Shield,
  Smartphone,
  ExternalLink,
  RefreshCw,
  Home
} from "lucide-react";
import Link from "next/link";

export default function Thanks() {
  const [links, setLinks] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState({});

  const fetchDownloadLinks = async (sessionId, isRetry = false) => {
    try {
      if (isRetry) {
        setLoading(true);
        setError(null);
      }

      const response = await fetch(`/api/stripe/claim?session_id=${sessionId}`);
      const data = await response.json();

      if (response.ok && data.links) {
        setLinks(data.links);
        setCustomerInfo({
          email: data.customerEmail,
          name: data.customerName
        });
        setError(null);
      } else {
        setError(data.error || "Could not fetch download links");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const session_id = new URLSearchParams(window.location.search).get("session_id");
    
    if (!session_id) { 
      setError("Missing payment session ID. Please check your email for download links."); 
      setLoading(false);
      return; 
    }

    fetchDownloadLinks(session_id);
  }, []);

  const handleRetry = () => {
    const session_id = new URLSearchParams(window.location.search).get("session_id");
    if (session_id && retryCount < 3) {
      setRetryCount(prev => prev + 1);
      fetchDownloadLinks(session_id, true);
    }
  };

  const handleDownloadClick = (linkId, url, title) => {
    // Track download progress
    setDownloadProgress(prev => ({
      ...prev,
      [linkId]: { downloading: true, title }
    }));

    // Simulate download completion after a short delay
    setTimeout(() => {
      setDownloadProgress(prev => ({
        ...prev,
        [linkId]: { downloaded: true, title }
      }));
    }, 2000);

    // Open download link
    window.open(url, '_blank');
  };

  const getDownloadStatus = (linkId) => {
    const status = downloadProgress[linkId];
    if (status?.downloaded) return "downloaded";
    if (status?.downloading) return "downloading";
    return "ready";
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F9FA' }}>
        <motion.div 
          className="text-center p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Preparing Your Downloads...
          </h2>
          <p className="text-gray-600">
            Verifying your payment and generating secure download links
          </p>
        </motion.div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-md mx-auto text-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
            <p className="text-red-600 mb-6">{error}</p>
            
            <div className="space-y-3">
              {retryCount < 3 && (
                <button
                  onClick={handleRetry}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again ({3 - retryCount} attempts left)
                </button>
              )}
              
              <Link 
                href="/guide"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                Back to Guides
              </Link>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
              <p><strong>Need help?</strong></p>
              <p>Contact us at <a href="mailto:contact@hmwebs.com" className="underline">hello@moroccanadvisor.com</a> with your order details.</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen py-16" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CheckCircle className="w-20 h-20 mx-auto mb-6" />
            </motion.div>
            
            <h1 className="text-4xl font-bold mb-4">
              Thank you for your purchase! 🎉
            </h1>
            
            {customerInfo?.name && (
              <p className="text-xl opacity-90">
                Hi {customerInfo.name}! Your Morocco travel guides are ready.
              </p>
            )}
          </div>

          {/* Downloads Section */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Download Links</h2>
                <p className="text-gray-600">Click to download your travel guides</p>
              </div>
            </div>
            
            <div className="grid gap-4 mb-8">
              <AnimatePresence>
                {links.map((link, i) => {
                  const status = getDownloadStatus(i);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{link.title}</h3>
                            <p className="text-gray-600 text-sm">PDF Guide • {link.filename}</p>
                          </div>
                        </div>
                        
                        <motion.button
                          onClick={() => handleDownloadClick(i, link.url, link.title)}
                          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                            status === 'downloaded' 
                              ? 'bg-green-100 text-green-700' 
                              : status === 'downloading'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                          whileHover={{ scale: status === 'ready' ? 1.05 : 1 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={status === 'downloading'}
                        >
                          {status === 'downloaded' ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Downloaded
                            </>
                          ) : status === 'downloading' ? (
                            <>
                              <motion.div
                                className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              Downloading...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              Download PDF
                              <ExternalLink className="w-4 h-4" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Important Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Important Download Information</h3>
                  <ul className="text-amber-800 text-sm space-y-1">
                    <li>• Download links are valid for 24 hours</li>
                    <li>• Save the PDF files to your device for offline access</li>
                    <li>• Files are optimized for mobile viewing during your trip</li>
                    <li>• No internet required once downloaded</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Email Confirmation */}
            {customerInfo?.email && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Email Confirmation Sent</h3>
                    <p className="text-green-800 text-sm">
                      A copy of your download links has been sent to <strong>{customerInfo.email}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">📱 Save for Offline</h4>
                  <p className="text-gray-600 text-sm">Download the PDFs to your phone for easy access during your Morocco trip.</p>
                </div>
                
                <div className="text-center p-6 bg-orange-50 rounded-xl">
                  <FileText className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">🗺️ Start Planning</h4>
                  <p className="text-gray-600 text-sm">Use the guides to plan your itinerary and discover hidden gems.</p>
                </div>
                
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">🛡️ Travel Safely</h4>
                  <p className="text-gray-600 text-sm">Follow the safety tips and cultural guidelines for an authentic experience.</p>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="mt-8 text-center p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
              <p className="text-gray-600 text-sm mb-4">
                If you have any issues downloading your guides or questions about your trip planning, we're here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="mailto:contact@hmwebs.com"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </a>
                <Link 
                  href="/experiences"
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Browse Experiences
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-gray-600"
        >
          <p>Thank you for choosing Moroccan Advisor. Have an amazing trip! 🇲🇦✨</p>
        </motion.div>
      </div>
    </div>
  );
}