package cl.duoc.style.and.beauty.usuario.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "USUARIO")
@Getter @Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USUARIO")
    private Long id;

    @Column(name = "UID", nullable = false, unique = true)
    private String uid;

    @Column(name = "EMAIL", nullable = false)
    private String correo;

    @Column(name = "NOMBRE", nullable = false)
    private String nombre;

    @Column(name = "ROL", nullable = false)
    private String rol; // ADMIN | CLIENTE | TRABAJADOR | etc

    @Column(name = "ESTADO", nullable = false)
    private String estado; // ACTIVO | INACTIVO
}
