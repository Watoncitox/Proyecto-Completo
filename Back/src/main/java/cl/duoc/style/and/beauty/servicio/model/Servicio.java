package cl.duoc.style.and.beauty.servicio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "SERVICIO")
@Getter
@Setter
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_SERVICIO")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_CATEGORIA", nullable = false)
    private CategoriaServicio categoria;

    @Column(name = "NOMBRE", nullable = false, unique = true)
    private String nombre;

    @Column(name = "DESCRIPCION")
    private String descripcion;

    @Column(name = "DURACION_MIN", nullable = false)
    private Integer duracionMin;

    @Column(name = "PRECIO", nullable = false)
    private Double precio;

    @Column(name = "IMAGEN_URL")
    private String imagenUrl;
}
