import React from 'react';
import crypto from 'crypto';

class EncryptionUtils extends React.Component {
  static encryptPassword(password) {
    const cipher = crypto.createCipher('aes-256-cbc', password);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  static decryptPassword(encryptedPassword) {
    const decipher = crypto.createDecipher('aes-256-cbc', encryptedPassword);
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  render() {
    return null;
  }
}

export default EncryptionUtils;
