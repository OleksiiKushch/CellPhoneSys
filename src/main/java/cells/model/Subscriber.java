package cells.model;

import java.io.Serializable;

public class Subscriber implements Serializable {
    private String name;
    private String surname;
    private String phoneNumber;
    private String password;
    private String passwordHash;
    private String active;
    private String balance;
    private String tariffUuid;
    private String tariffExpiresAt;
    private String tariffIssuedAt;
    private String messagesLeft;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String isActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public String getTariffUuid() {
        return tariffUuid;
    }

    public void setTariffUuid(String tariffUuid) {
        this.tariffUuid = tariffUuid;
    }

    public String getTariffExpiresAt() {
        return tariffExpiresAt;
    }

    public void setTariffExpiresAt(String tariffExpiresAt) {
        this.tariffExpiresAt = tariffExpiresAt;
    }

    public String getTariffIssuedAt() {
        return tariffIssuedAt;
    }

    public void setTariffIssuedAt(String tariffIssuedAt) {
        this.tariffIssuedAt = tariffIssuedAt;
    }

    public String getMessagesLeft() {
        return messagesLeft;
    }

    public void setMessagesLeft(String messagesLeft) {
        this.messagesLeft = messagesLeft;
    }
}
