import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  /* ---------- Header ---------- */
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: '2%',
  },

  subtitle: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
    fontWeight: '500',
    width: '75%',
  },

  bold: {
    fontWeight: '700',
  },

  wrongNumberButton: {
    marginTop: 8,
  },

  wrongNumberText: {
    fontSize: 13,
    color: '#185DE9',
    lineHeight: 22,
  },

  /* ---------- OTP ---------- */
  otpSection: {
    marginBottom: 28,
  },

  otpInputWrapper: {
    position: 'relative',
    marginBottom: 18,
  },

  otpInput: {
    width: '100%',
    height: 56,
    borderBottomWidth: 2,
    borderColor: '#DDD',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    textAlignVertical: 'center',
    lineHeight: Platform.OS === 'android' ? 28 : 26,
  },

  otpInputError: {
    backgroundColor: '#FFF7F7',
    borderColor: '#FF6B6B',
  },

  otpInputComplete: {
    backgroundColor: '#F8F7FF',
    borderColor: '#005DD6',
  },

  clearOtpButton: {
    position: 'absolute',
    right: 12,
    top: 16,
    padding: 6,
  },

  /* ---------- Actions ---------- */
  actionsContainer: {
    marginBottom: 28,
  },

  verifyButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: '#005DD6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,

    // Android
    elevation: 4,

    // iOS
    shadowColor: '#005DD6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  verifyButtonDisabled: {
    backgroundColor: '#005dd688',
  },

  verifyButtonError: {
    backgroundColor: '#005DD6',
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  verifyText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginRight: 6,
  },

  /* ---------- Resend ---------- */
  resendContainer: {
    alignItems: 'center',
  },

  resendPrompt: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
  },

  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },

  resendText: {
    fontSize: 20,
    color: '#185DE9',
    fontWeight: '600',
    marginLeft: 25,
  },

  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  resendTimerText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 6,
  },
});

export default styles;
