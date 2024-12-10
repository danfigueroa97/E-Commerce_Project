    package com.entorno.E_Commerce_Project.model;

    import com.entorno.E_Commerce_Project.ENUM.Role;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Document(collection = "user")
    public class User {

        @Id
        private String id;

        private String idUser;
        private String username;
        private String password;
        private String email;
        private String address;
        private Role role;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getIdUser() {
            return idUser;
        }

        public void setIdUser(String idUser) {
            this.idUser = idUser;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public Role getRole() {
            return role;
        }

        public void setRole(Role role) {
            this.role = role;
        }

    }
