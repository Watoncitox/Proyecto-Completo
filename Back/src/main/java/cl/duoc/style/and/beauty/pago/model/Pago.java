package cl.duoc.style.and.beauty.pago.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "PAGO")
@Getter
@Setter
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PAGO")
    private Long id;

    @Column(name = "ID_CITA", nullable = false)
    private Long idCita;

    @Column(name = "METODO", nullable = false, length = 30)
    private String metodo;

    @Column(name = "MONTO", nullable = false)
    private Double monto;

    @Column(name = "FECHA_PAGO", insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaPago;


    @Column(name = "ESTADO", nullable = false, length = 20)
    private String estado;
}
