package cl.duoc.style.and.beauty.trabajador.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TRABAJADOR")
@Getter
@Setter
public class Trabajador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TRABAJADOR")
    private Long id;

    @Column(name = "ID_USUARIO", nullable = false, unique = true)
    private Long idUsuario;

    @Column(name = "ESPECIALIDAD")
    private String especialidad;

    @Column(name = "EXPERIENCIA")
    private Integer experiencia;
}
