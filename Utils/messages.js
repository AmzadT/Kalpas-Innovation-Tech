const messages = {
    auth_required: {
      en: 'Authentication required.',
      hi: 'प्रमाणीकरण आवश्यक है।'
    },
    invalid_token: {
      en: 'Invalid or expired token.',
      hi: 'अमान्य या समाप्त टोकन।'
    },
    unauthorized: {
      en: 'You are not authorized to perform this action.',
      hi: 'आपको यह क्रिया करने की अनुमति नहीं है।'
    },
    book_added: {
      en: 'Book added to inventory.',
      hi: 'किताब इन्वेंटरी में जोड़ी गई।'
    },
    book_removed: {
      en: 'Book removed from inventory.',
      hi: 'किताब इन्वेंटरी से हटाई गई।'
    },
    book_not_found: {
      en: 'Book not found.',
      hi: 'किताब नहीं मिली।'
    },
    library_not_found: {
      en: 'Library not found.',
      hi: 'पुस्तकालय नहीं मिला।'
    },
    inventory_list: {
      en: 'Library inventory fetched successfully.',
      hi: 'पुस्तकालय इन्वेंटरी सफलतापूर्वक प्राप्त की गई।'
    }
  };
  
  const getMessage = (key, lang = 'en') => {
    return messages[key]?.[lang] || messages[key]?.['en'] || 'Unknown message';
  };
  
  module.exports = { getMessage };
  