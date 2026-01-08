import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },

  /* ---------- Header ---------- */
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: '600',
    letterSpacing: -2,
    color: '#000',
    marginBottom: 40,
  },

  subtitle: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },

  link: {
    color: '#185DE9',
  },

  /* ---------- Inputs ---------- */
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 12,
    alignItems: 'center',
  },

  countryDropdown: {
    borderBottomWidth: 1,
    borderColor: '#005DD6',
    paddingVertical: 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },

  countryDropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countryFlag: {
    fontSize: 24,
    marginRight: 6,
  },

  countryName: {
    marginLeft: 150,
    fontSize: 20,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
  },

  countryCodeWrapper: {
    width: 80,
    height: 52,
    borderBottomWidth: 1,
    borderColor: '#005DD6',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginRight: 12, // replaces gap
  },

  countryCodeInput: {
    fontSize: 20,
    fontWeight: '400',
    color: '#333',
  },

  phoneInputWrapper: {
    flex: 1,
    height: 52,
    borderBottomWidth: 1,
    borderColor: '#005DD6',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  phoneInput: {
    fontSize: 20,
    color: '#333',
  },

  inputError: {
    borderColor: '#FF6B6B',
  },

  inputValid: {
    borderColor: '#4CAF50',
  },

  clearButton: {
    padding: 6,
  },
  whatsMyNumber: {
    color: '#185DE9',
  },

  /* ---------- Error ---------- */
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    marginLeft: 6,
  },

  /* ---------- Button ---------- */
  loginButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#005DD6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: 24,

    // Android shadow
    elevation: 4,

    // iOS shadow
    shadowColor: '#005DD6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  loginButtonDisabled: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '600',
  },

  /* ---------- Modal ---------- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },

  closeButton: {
    padding: 6,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  selectedCountryItem: {
    backgroundColor: '#F6F8FF',
  },

  countryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  countryItemFlag: {
    fontSize: 20,
    marginRight: 12,
  },

  countryItemName: {
    fontSize: 20,
    color: '#333',
  },

  countryItemCode: {
    fontSize: 16,
    color: '#666',
  },

  countryItemDialCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },

  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});

export default styles;
