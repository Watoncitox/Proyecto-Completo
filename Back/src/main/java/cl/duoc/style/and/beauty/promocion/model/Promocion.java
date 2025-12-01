package cl.duoc.style.and.beauty.promocion.model;

import cl.duoc.style.and.beauty.servicio.model.Servicio;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Data
@Entity
@Table(name = "PROMOCION")
public class Promocion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PROMOCION")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_SERVICIO", nullable = false)
    private Servicio servicio;

    @Column(name = "DESCUENTO", nullable = false)
    private Double descuento;

    @Column(name = "FECHA_INICIO", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaInicio;

    @Column(name = "FECHA_FIN", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaFin;

    @Column(name = "ACTIVA", nullable = false)
    private String activa; // S o N
}
